const mongoose = require("mongoose");
const shortId = require("./shortId");

const orderSchema = new mongoose.Schema({
    shortId,    // OrderId
    Name: {type: String, required: true},
    Address: {type: String, required: true},
    Phone: {type: String, required: true},
    Email: {type: String, required: true},

    ProductInfos: {type: Object, require: true},
    
    TotalPrice: {type: Number, required: true},
    Status: {type: String, required: true},
    Cancel: {type: Boolean, required: true}
},{
    timestamps: true,
});

const orderModel = mongoose.model("orderModel", orderSchema);

module.exports = orderModel;