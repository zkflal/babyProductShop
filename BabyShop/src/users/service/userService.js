const {User} = require("../models/user");
const hashPassword = require("../../../utils/hashedPwd");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

//로그인
const loginUser  = async(req,res,next) => {
    const {UserId , HashPwd} = req.body;
    const hashedPwd = hashPassword(HashPwd);
    try
    {
        const user = await User.findOne({UserId,HashPwd:hashedPwd});
        if (!user) {    
            const err = new Error("회원정보를 찾을 수  없습니다.");
             err.status = 401;
             throw err;
            };
        token = jwt.sign({
            type:'JWT',
            UserId:UserId},
            SECRET_KEY
            );
        res.status(200).json({token:token}).end("로그인 성공");
    }
    catch(err){
        next(err);
    }
}

//회원가입
const joinUser = async (req,res,next) => {
    const { UserId, UserName, Address, HashPwd,  Email } = req.body;
    const hashedPwd = hashPassword(HashPwd);
    console.log(UserId);
    try{
        const existingUser = await User.findOne({UserId : UserId});
        if (!existingUser){
            await User.create({
                UserId,
                UserName,
                Address,
                HashPwd: hashedPwd,
                Email,
            });
            res.status(200).end("회원가입성공");
         } 
        else {
        res.status(400).end("사용자가 존재합니다."); 
    }
}
    catch(err){
        console.log(err);
        next(err);    
    }
}

//회원 탈퇴
const deleteUser = async(req,res,next) =>{
    const {userid} = req.params;
    try{
        await User.findOneAndDelete({UserId: userid});
        res.status(200).end("삭제 성공");
    }
    catch(err){
        console.log(err);
        err.status = 400;
        next(err);
    }
}

//회원 정보 보여주기
const detailUser = async(req,res,next) => {
    const {userid} = req.params;
    try{
        const userdetail = await User.findOne({ UserId : userid });
        console.log(userdetail);
        if (!userdetail){
            const err = new Error("회원정보를 찾을 수  없습니다.");
            err.status = 401;
            throw err;
        }
            res.status(200).json(userdetail).end();
    }
    catch(err){
       next(err);
    }

}

//회원 정보 수정
const chageUser = async(req,res,next) => {
    const {UserId , UserName, Address,Email,HashPwd,Phone } = req.body;
    const hashedPwd = hashPassword(HashPwd);
    try{ 
    console.log(UserId)
    const user = await User.findOneAndUpdate(
        {UserId : UserId},
        {
            UserName,
            Address,
            Email,
            HashPwd: hashedPwd,
            Phone,
        },
        {new: true},
        )
        res.status(200).json(user);
    }
catch(err){
         console.log(err);
         err.status = 400;
        next(err);
    }  
}

//비밀번호 변경
// const changePwd = async(req,res,next) => {
//     const { HashPwd } = req.body;

// }


module.exports = {loginUser,joinUser, deleteUser,detailUser, chageUser};