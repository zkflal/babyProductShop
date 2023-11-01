const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// 환경변수 설정
require("dotenv").config({ path: ".env.local" });
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

const orderRouter = require("./routes/orderRouter");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// 이미지 불러오기 (테스트)
app.use(express.static('public'));
app.use('/img', (req, res)=>{
  const url = `http://localhost:${port}/images/bmo1.gif`;
  res.send(url);
})

// 만드는중
app.use('/orders', orderRouter);
app.post('/login', (req, res, next)=>{
    const {email, password} = req.body;
    console.log(email, password);
    res.status(200).send({email, password});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// app.listen(port, (req, res)=>{
//   console.log(`Server running on port : ${port}`);
// })

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB 연결 성공");
  })
  .catch((err) => {
    console.log("MongoDB 연결 실패 : ", err);
  });

module.exports = app;