const mongoose = require('mongoose');
const shortId = require('./shortId');


const userSchema = new mongoose.Schema({
    shortId, // null값 허용
    UserName:{
        type:String,
        required:true,
    },
    Address : {
        type:String,
        required:true,
    },
    Email : {
        type:String,
    },
    HashPwd : {
        type:String,
        required:true,
    },
    Phone : {
        type:String,
        required:true,
    },
})

exports.User = mongoose.model("User",userSchema);
