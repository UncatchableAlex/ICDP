const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const auth = require("./creds.json");



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(auth.cookieSignature));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/login', loginRouter);


module.exports = app;
