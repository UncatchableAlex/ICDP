var express = require("express");
var router = express.Router();
const cors = require("cors")


const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.options("/", cors(corsOptions))

router.post('/', cors(corsOptions), function (req, res, next) {
    console.log(req.body)
    //res.json({msg: 'This is CORS-enabled for only example.com.'})
})

module.exports = router;