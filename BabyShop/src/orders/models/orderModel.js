const mongoose = require("mongoose");
const shortId = require("../../../utils/shortId");

const ProductInfosType = new mongoose.Schema({
    Price: {type:Number, required:true},
    ProductName: {type:String, required:true},
    ProductImg: {type:String, required:true},
    Detail: {type:String, required:true},
    Condition: {type:String, required:true},
})

const orderSchema = new mongoose.Schema({
    shortId,    // OrderId

    UserId: {type: String, required: true},
    Name: {type: String, required: true},
    Address: {type: String, required: true},
    Phone: {type: String, required: true},
    Email: {type: String, required: true},

    ProductInfos: [ProductInfosType],
    
    TotalPrice: {type: Number, required: true},
    Status: {type: String, required: true},
    Cancel: {type: Boolean, required: true}
},{
    timestamps: true,
});

const orderModel = mongoose.model("orderModel", orderSchema);

module.exports = orderModel;