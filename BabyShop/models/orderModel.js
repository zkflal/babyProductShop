const mongoose = require("mongoose");
const shortId = require("./shortId");

const orderSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Adress: {type: String, required: true},
    PhoneNumber: {type: String, required: true},
    Email: {type: String, required: true},

    ProductInfo: {type: Object, require: true},
    
    shortId,    // OrderId
    TotalPrice: {type: Number, required: true},
    OrderStatus: {type: Number, required: true},
},{
    timestamps: true,
});

const orderModel = mongoose.model("orderModel", orderSchema);

module.exports = orderModel;