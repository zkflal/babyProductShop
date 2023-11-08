const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const categorySchema = new Schema({
  name: { type: String, required: true },
  en_name: { type: String, require: true },
  child: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
});
const mainCategoryModel = mongoose.model("MainCategory", categorySchema);

module.exports = mainCategoryModel;
