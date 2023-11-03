const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./src/users/routes/userRouter");

// 환경변수 설정
require("dotenv").config({ path: ".env.local" });
const uri = process.env.ATLAS_URI;

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});


mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB 연결 성공");
  })
  .catch((err) => {
    console.log("MongoDB 연결 실패 : ", err);
  });

module.exports = app;