var express = require("express");
var router = express.Router();
const cors = require("cors")
const pbkdf2 = require("pbkdf2")
const crypto = require("crypto")
const {Client} = require("pg");
const creds = require("./dbcreds.json")

console.log("Connecting to RDS with creds: " + creds)
const client = new Client(creds);

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.options("/", cors(corsOptions))

client.connect()
router.post('/', cors(corsOptions), async (req, res, next) => {
  console.log(req.body)
  client
      .query("SELECT pword,salt FROM account WHERE username=$1::text", [req.body.username])
      .then((dbres) => {
        console.log(dbres.rows[0]);
        const hashed = pbkdf2.pbkdf2Sync(req.body.password, dbres.rows[0].salt, 310000, 64, "sha512").toString("hex");
        res.send(dbres.rows[0].pword === hashed ? "good password" : "bad password")
      })
})
//const salt = crypto.randomBytes(32).toString('hex');
//const hashed = pbkdf2.pbkdf2Sync(req.body.password, salt, 310000, 64, "sha512").toString("hex");
//console.log("hashed pword %s", hashed);
// console.log("salt: " + salt);
module.exports = router;