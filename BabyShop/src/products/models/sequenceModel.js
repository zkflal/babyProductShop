const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const sequenceSchema = new Schema({
  seq: { type: Number, required: true },
});

const sequenceModel = mongoose.model("Sequence", sequenceSchema);

module.exports = sequenceModel;
