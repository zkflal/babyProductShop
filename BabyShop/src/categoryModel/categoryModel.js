const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const categorySchema = new Schema({
  Category: { type: String, required: true },
  ProductList: { type: [Number] },
  ChildCategory: { type: [String] },
});
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
