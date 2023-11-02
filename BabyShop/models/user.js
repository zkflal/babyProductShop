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
        required:true,
    },
    HashPwd : {
        type:String,
        required:true,
    },
    Phone : {
        type:String,
    },
})

exports.User = mongoose.model("User",userSchema);
