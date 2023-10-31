const mongoose = require("mongoose");
const shortId = require("./shortId");

const orderSchema = new mongoose.Schema({
    shortId,
    Product: {type: [Number], required: true},
    TotalPrice: {type: Number, required: true},
    OrderStatus: {type: Number, required: true},

    UserName: {type: String, required: true},
    Adress: {type: String, required: true},
    Phone: {type: String, required: true},
    Email: {type: String, required: true},
},{
    timestamps: true,
});

const orderModel = mongoose.model("orderModel", orderSchema);

module.exports = orderModel;