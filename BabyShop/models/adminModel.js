const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    AdminId: {type: String, requried: true},
    AdminPWD: {type: String, requried: true}
},{
    timestamps: true,
});

const adminModel = mongoose.model("adminModel", adminSchema);

module.exports = adminModel;