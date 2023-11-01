const User = require("../models/user");
const hashPassword = require("../utils/hashedPwd");


//회원가입
const joinUser = async (req,res) => {
    const { UserName, Address, HashPwd, Phone } = req.body;
    const hashedPwd = hashPassword(HashPwd);
    try{
        await User.create({
            UserName,
            Address,
            HashPwd:hashedPwd ,
            Phone,
        });
        res.staus(200).end();
    }
    catch(err){
        res.staus(400).end();
    }
}

module.exports = {joinUser};