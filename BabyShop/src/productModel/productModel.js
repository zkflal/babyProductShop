const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const productSchema = new Schema({
  seq: { type: Number, required: true },
  price: { type: Number, required: true },
  product_name: { type: String, required: true },
  product_img: { type: [String], required: true },
  detail: { type: String, required: true },
  condition: { type: String, required: true },
  amount: { type: Number, required: true },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
