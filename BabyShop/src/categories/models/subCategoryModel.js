const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const categorySchema = new Schema({
  name: { type: String, required: true },
  en_name: { type: String, require: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
});
const subCategoryModel = mongoose.model("SubCategory", categorySchema);

module.exports = subCategoryModel;
