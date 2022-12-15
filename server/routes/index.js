const express = require('express');
const  router = express.Router();
const http = require("http");
const { Server } = require("socket.io");
const {Queue} = require("../util/queue");
const {Utils} = require("../util/utils");
const queue = new Queue();
const app = require("../app")
var rooms = 0;

//app.use(express.static(__dirname + "/"));

router.get("/", (req, res) => {
  res.sendFile("../public/index.html");
  connect(req);
});




module.exports = router;
