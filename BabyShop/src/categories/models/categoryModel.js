const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const categorySchema = new Schema({
  name: { type: String, required: true },
  child: { type: [String] },
});
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
