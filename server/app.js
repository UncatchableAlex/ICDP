const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const loginRouter = require('./routes/login');
const auth = require("./creds.json");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(auth.cookieSignature));
console.log(__dirname)
app.use("/", express.static(__dirname + '/public/views/'));
app.use("/game", express.static(__dirname + '/public/'));
app.use("/login", loginRouter)
app.get('/', function (req,res) {
    res.sendFile(__dirname + "/public/views/");
});
app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

module.exports = app;
