const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const categorySchema = new Schema({
  name: { type: String, required: true },
  child: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
});
const subCategoryModel = mongoose.model("SubCategory", categorySchema);

module.exports = subCategoryModel;
