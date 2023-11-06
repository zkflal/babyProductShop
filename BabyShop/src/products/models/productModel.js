const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const productSchema = new Schema({
  seq: { type: Number, required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  img: { type: [String], required: true },
  detail: { type: String, required: true },
  condition: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
