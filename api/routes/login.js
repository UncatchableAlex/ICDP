/**
 * TODO:
 * - client pooling for pg
 * - OAuth support with github or google
 *
 */
var express = require("express");
var router = express.Router();
const cors = require("cors");
const pbkdf2 = require("pbkdf2");
const crypto = require("crypto");
const {Client} = require("pg");
const auth = require("../creds.json");
const client = new Client(auth.dbCreds);
const cookieParser = require("cookie-parser")
router.get('/',(req, res) => {
    res.send("hello world")
});

const badUser = {
    "accepted" : false,
    "message" : "user does not exist"
};
const badPw = {
    "accepted" : false,
    "message" : "incorrect password"
}
const allGood = {
    "accepted" : true,
    "message" : "all good"
}

client.connect()
router.post('/', (req, res, next) => {
    console.log("stored myCookie: ")
    console.log(cookieParser.signedCookie(req.signedCookies.myCookie));
    const creds = req.headers.authorization.split(":")
    console.log(creds)
    const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(creds[0])
    client
        // I know, I know... You aren't supposed to do concatenations in sql queries. It's fine here though because
        // the value can really be only one of two things. Using a query parameter to specify attributes is
        // impossible, unfortunately.
        .query("SELECT pword,salt FROM account WHERE " + (isEmail ? 'email' : 'username') + "=$1", [creds[0]])
        .then(
            // on success:
            (dbres) => {
                //console.log(dbres)
                // if we found nothing:
                if (dbres.rowCount === 0) {
                    res.send(badUser);
                    return res;
                }
                const hashed = pbkdf2.pbkdf2Sync(creds[1], dbres.rows[0].salt, 310000, 64, "sha512").toString("hex");
                if (dbres.rows[0].pword === hashed) {
                    const rand = crypto.randomBytes(32).toString("hex");
                    res.cookie("myCookie", creds[0]+":"+rand, {signed:true, maxAge:1000*60*60*8});
                    res.send(allGood);
                    return res;
                }
                console.log("hashed: " + hashed);
                console.log("stored: " + dbres.rows[0].pword);
                res.send(badPw);
                return res;
            },
            // on failure print *EVERYTHING*:
            (err) => {
                console.log("Username and password were received from app: ")
                console.log(req.body)
                console.log("\n A query to postgres was formed but an error was thrown upon the query's execution:\n")
                console.log(err);
            }
        );
});
//const salt = crypto.randomBytes(32).toString('hex');
//const hashed = pbkdf2.pbkdf2Sync(req.body.password, salt, 310000, 64, "sha512").toString("hex");
//console.log("hashed pword %s", hashed);
// console.log("salt: " + salt);
module.exports = router;