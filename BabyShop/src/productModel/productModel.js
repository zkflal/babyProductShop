const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const productSchema = new Schema({
  ProductId: { type: Number, required: true },
  Price: { type: Number, required: true },
  ProductName: { type: String, required: true },
  ProductImg: { type: [String], required: true },
  Detail: { type: String, required: true },
  Condition: { type: String, required: true },
  Amount: { type: Number, required: true },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
