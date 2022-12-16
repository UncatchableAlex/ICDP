/**
 * TODO:
 * - client pooling for pg
 * - OAuth support with github or google
 *
 */
var express = require("express");
var Router = require('express-promise-router')
const pbkdf2 = require("pbkdf2");
const crypto = require("crypto");
const {Client} = require("pg");
const auth = require("../creds.json");
const client = new Client(auth.dbCreds);
const cookieParser = require("cookie-parser")
const router = Router()
router.get('/',(req, res) => {
});

const badUser = {
    "accepted" : false,
    "message" : "user does not exist"
};
const badPw = {
    "accepted" : false,
    "message" : "incorrect password"
};
const allGood = {
    "accepted" : true,
    "message" : "all good"
};

const badNewUser = {
    "accepted" : false,
    "message" : "one or more fields unacceptable"
};

const userAlreadyExists = {
    "accepted" : false,
    "message" : "username already taken"
};

const emailAlreadyExists = {
    "accepted" : false,
    "message" : "email already has account registered"
};

function testEmail(email) {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

client.connect();
router.post('/', async (req, res, next) => {
    console.log("stored myCookie: ")
    console.log(cookieParser.signedCookie(req.signedCookies.myCookie));
    const creds = req.headers.authorization.split(":")
    const username = creds[0].toLowerCase();
    const password = creds[1]
    console.log(creds)
    const isEmail = testEmail(username)
    // I know, I know... You aren't supposed to do concatenations in sql queries. It's fine here though because
    // the value can really be only one of two things. Using a query parameter to specify attributes is
    // impossible, unfortunately.
    const queryText = "SELECT pword,salt FROM account WHERE " + (isEmail ? 'email' : 'username') + "=$1";
    const {rows} = await client.query(queryText, [username])
    // if we found nothing:
    if (rows.length === 0) {
        res.send(badUser);
        return res;
    }
    const hashed = pbkdf2.pbkdf2Sync(password, rows[0].salt, 310000, 64, "sha512").toString("hex");
    if (rows[0].pword === hashed) {
        const now = new Date();
        res.cookie("myCookie", username+":"+now, {signed:true, maxAge:1000*60*60*8});
        res.send(allGood);
        return res;
    }
    console.log("hashed: " + hashed);
    console.log("stored: " + rows[0].pword);
    res.send(badPw);
    return res;
});

router.post('/new-user', async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email.toLowerCase();
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const isEmail = testEmail(email);
    const pwHasNums = password.match(/[0-9]/) != null;
    const pwHasUpperCase = password.match(/[A-Z]/) != null;
    const normalUserName = /^[A-Za-z0-9]+$/.test(username);
    const pwLenGood = password.length >= 8;
    const unFilled = username.length > 0;
    const unSized = username.length <= 20;
    const pwSized = password.length <= 100;
    const emailSized = email.length <= 50;
    if (!isEmail || !pwHasNums || !pwHasUpperCase || !normalUserName || !pwLenGood || !unFilled || !unSized ||
        !pwSized || !emailSized) {
        console.log("bad new user");
        res.send(badNewUser);
        return res;
    }
    console.log(username)
    const unExistsText = "SELECT EXISTS (SELECT 1 FROM account WHERE username = $1 LIMIT 1)"
    const unExists = await client.query(unExistsText, [username]);
    if (unExists.rows[0].exists) {
        res.send(userAlreadyExists)
        return res;
    }
    const emailExistsText = "SELECT EXISTS (SELECT 1 FROM account WHERE email = $1 LIMIT 1)"
    const emailExists = await client.query(emailExistsText, [email]);
    if (emailExists.rows[0].exists) {
        res.send(emailAlreadyExists)
        return res;
    }
    console.log("checked users");
    const salt = crypto.randomBytes(32).toString("hex")
    const hashed = pbkdf2.pbkdf2Sync(password, salt, 310000, 64, "sha512").toString("hex")
    const addUserText = "INSERT INTO account(username, email, pword, salt) VALUES ($1,$2,$3,$4)";
    console.log("inserted new user");
    const userAdded = await client.query(addUserText, [username, email, hashed, salt]);
    const now = new Date();
    res.cookie("myCookie", username+":"+now, {signed:true, maxAge:1000*60*60*8});
    res.send(allGood);
    return res;
});
module.exports = router;
