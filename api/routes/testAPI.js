var express = require("express");
var myRouter = express.Router();


myRouter.get("/testAPI/post-test", (res, req) => {
        res.send([
            {
                id: 1,
                name: "John doe"
            },
            {
                id:2,
                name: "Jane doe"
            }
        ]);
    }
);
m

module.exports = myRouter;