const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const shortId = require("./shortId");
const ProductSchema = new Schema({
  ProductId: shortId,
  Category: { type: Number, required: true },
  Price: { type: Number, required: true },
  ProductName: { type: String, required: true },
  ProductImg: { type: [String], required: true },
  Detail: { type: String, required: true },
  Condition: { type: Number, required: true },
  Amount: { type: Number, required: true },
});

exports.Product = mongoose.model("Product", ProductSchema);
