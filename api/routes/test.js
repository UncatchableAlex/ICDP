var express = require("express");
var router = express.Router();
const cors = require("cors")
const {Client} = require("pg");



const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//const client = new Client(creds);

router.options("/", cors(corsOptions))

/*client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})
client.query("SELECT * FROM game; SELECT gameId FROM game", (err, res) => {
    if (err) {
        throw err
    }
    console.log(res)
    client.end()
})*/

module.exports = router;