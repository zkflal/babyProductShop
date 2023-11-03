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

const app = express();
const adminRouter = require("./src/admin/routes/adminRouter");
const orderRouter = require("./src/orders/routes/orderRouter");
const orderAdminRouter = require("./src/orders/routes/orderAdminRouter");

const {checkAdmin} = require("./utils/adminMiddleware");
const userRouter = require("./src/users/routes/userRouter");





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// 만드는중
app.use('/users',userRouter);
app.use('/orders', checkAdmin, (req, res, next)=>{
    if(req.admin){
      orderAdminRouter(req, res, next);
    }else{
      orderRouter(req, res, next);
    }
});
app.use('/admin', adminRouter);

// 이미지 불러오기 (테스트)
app.use(express.static('public'));
app.use('/img', (req, res)=>{
  const url = `http://localhost:${port}/images/bmo1.gif`;
  res.send(url);
})
// 테스트용 미들웨어
app.post('/login', (req, res, next)=>{
    const {email, password} = req.body;
    console.log(email, password);
    res.status(200).send({msg: "okok", email, password});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
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