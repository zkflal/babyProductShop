var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./src/productModel/routes/productRouter");
const productAdminRouter = require("./src/productModel/routes/productAdminRouter");
const categoryRouter = require("./src/categoryModel/routes/categoryRouter");
const categoryAdminRouter = require("./src/categoryModel/routes/categoryAdminRouter");
const checkAdmin = require("./utils/checkAdmin");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
var app = express();

mongoose
  .connect(process.env.ATLAS_URI)
  .then((client) => {
    console.log("mongo connected");
    console.log("test client: ", client);
  })
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//send file
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("hello");
});

// app.use("/admin", adminRouter);
app.use("/products", checkAdmin, (req, res, next) => {
  if (req.admin) {
    productAdminRouter(req, res, next);
  } else {
    productRouter(req, res, next);
  }
});
app.use("/categories", checkAdmin, (req, res, next) => {
  if (req.admin) {
    categoryAdminRouter(req, res, next);
  } else {
    categoryRouter(req, res, next);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
