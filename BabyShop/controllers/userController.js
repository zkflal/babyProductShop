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

//회원 탈퇴
const deleteUser = async(req,res) =>{
    const {userid} = req.params;
    try{
        await User.deleteOne({shortId: userid});
        res.status(200).end();
    }
    catch(err){
        console.log(err);
        res.status(400).end();
    }
}

//회원 정보 보여주기
const detailUser = async(req,res) => {
    const {userid} = req.params;
    try{
        const userdetail = await User.find({shortId: userid});
        console.log(userdetail);
        res.status(200).json(userdetail);
    }
    catch(err){
        console.log(err);
        res.status(500).end();
    }

}


module.exports = {joinUser, deleteUser,detailUser};