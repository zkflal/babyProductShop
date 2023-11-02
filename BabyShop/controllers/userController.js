const {User} = require("../models/user");
const hashPassword = require("../utils/hashedPwd");


//회원가입
const joinUser = async (req,res) => {
    const { UserName, Address, HashPwd, Email } = req.body;
    const hashedPwd = hashPassword(HashPwd);
    console.log(UserName);
    try{
        await User.create({
            UserName,
            Address,
            HashPwd:hashedPwd ,
            Email,
        });

        res.status(200).end();
    }
    catch(err){
        console.log(err);
        res.status(400).end();
    }
}


module.exports = {joinUser};