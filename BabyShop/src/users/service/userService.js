const {User} = require("../models/user");
const hashPassword = require("../../../utils/hashedPwd");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const mailer = require("../../../utils/mail");

//로그인
const loginUser  = async(req,res,next) => {
    const {UserId , HashPwd} = req.body;
    const hashedPwd = hashPassword(HashPwd);
    try
    {
        const user = await User.findOne({UserId});
        if (!user) {   
            throw {status: 404, message:"회원정보를 찾을 수 없습니다."};
        }

        if (hashedPwd !== user.HashPwd){
            throw {status: 404, message:"비밀번호가 일치하지 않습니다."};
        }
        token = jwt.sign({
            type:'JWT',
            UserId:UserId,
            Admin:false},
            SECRET_KEY,
            {expiresIn:'1d'}
            );

        res.status(200).json({token:token});
    }
    catch(err){
        next(err);
    }
}

//회원가입
const joinUser = async (req,res,next) => {
    const { UserId, UserName, Address, HashPwd,  Email } = req.body;
    const hashedPwd = hashPassword(HashPwd);
    try{
        const existingUser = await User.findOne({UserId : UserId});
        if (existingUser){
            throw {status: 404, message:"이미 가입된 계정입니다."};
            } 
         await User.create({
            UserId,
            UserName,
            Address,
            HashPwd: hashedPwd,
            Email,
        });
        res.status(200).end("회원가입성공");
}
    catch(err){
        next(err);    
    }
}

//only 아이디만 중복체크!
const checkId = async (req,res,next) => {
    const {userid} = req.params;
    try{
        const existingUser = await User.findOne({UserId : userid});
        if (existingUser){
            throw {status: 404, message:"이미 가입된 계정입니다."};
            } 
        res.status(200).end("중복 없음");
}
    catch(err){
        next(err);    
    }
}




//회원 탈퇴
const deleteUser = async(req,res,next) =>{
    const UserId = req.decoded.UserId;
    try{
        const existingUser = await User.findOne({UserId : UserId});
        if (!existingUser){
            throw {status: 404, message:"회원정보를 찾을 수 없습니다."};
         } 
         await User.deleteOne({
            UserId : UserId,
        });
        res.status(200).end("삭제 성공");
    }
    catch(err){
        next(err);    
    }
}

//회원정보 보여주기용 본인인증
const detailUserAuth = async(req,res,next) =>{
    const TokenUserId = req.decoded.UserId;
    const {UserId , HashPwd} = req.body;
    const hashedPwd = hashPassword(HashPwd);
    try
    {
        if(TokenUserId !== UserId)
        {
            throw {status: 401, message:"아이디와 토큰이 일치하지않습니다."};
        }
        
        const user = await User.findOne({UserId,HashPwd:hashedPwd});
        if (!user) {    
            throw {status: 404, message:"회원정보를 찾을 수 없습니다."};
            };
        res.status(200).end("본인인증 성공");
       
    }
    catch(err){
        next(err);
    }
}


//회원 정보 보여주기
const detailUser = async(req,res,next) => {
    const UserId = req.decoded.UserId;
    try{
        const userdetail = await User.findOne({ UserId : UserId });
        if (!userdetail){
            throw {status: 404, message:"회원정보를 찾을 수 없습니다."};
        }
            res.status(200).json(userdetail);
    }
    catch(err){
       next(err);
    }
}


//회원 정보 수정
const chageUser = async(req,res,next) => {
    const UserId = req.decoded.UserId;
    const { UserName, Address,Email,HashPwd,Phone } = req.body;
    const hashedPwd = hashPassword(HashPwd);
    try{
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
         err.status = 400;
        next(err);
    }  
}

//비밀번호 변경
const changePwd = async(req,res,next) => {
    const userId = req.params.userid;
    const newHashPwd  = req.body.HashPwd;
    const hashedPwd = hashPassword(newHashPwd);
    console.log(`userId: ${userId}`)

    try{
        const user = await User.findOneAndUpdate(
            {UserId : userId},
            {
                $set:{
                    HashPwd: hashedPwd,
                }
            },
            {new: true},
            )
            return res.status(200).json(user);
        }
    catch(err){
             err.status = 400;
            next(err);
        }  
}


//비밀번호 찾기용 본인인증 (이메일과 아이디로 진행)
const changePasswordAuth = async(req,res,next) =>{
    const {UserId , Email} = req.body;
    try
    {
        const user = await User.findOne({UserId,Email});
        if (!user) {    
            throw {status: 404, message:"회원정보를 찾을 수 없습니다."};
            };

        let emailParams ={
            toEmail: Email,
            subject : "비밀번호 재설정 안내입니다.",
            html: `
            <div>
                <h2>비밀번호 재설정 안내입니다.</h2>
                <div> 안녕하세요 애기어때입니다.</div>
                <div>비밀번호 재설정을 원하시면 하단에 있는 링크를 통해 변경부탁드립니다.</div>
                <div>변경을 원치 않으실 경우 이 메일은 무시하셔도 됩니다.</div>
                '<p>  http://kdt-sw-7-team02.elicecoding.com/pw-change/?UserId=${UserId} </p>'   
        </div>`, 
        };
        mailer.sendEmail(emailParams);
        console.log(emailParams.html);
        res.status(200).end("본인인증 성공");
    }
    catch(err){
        next(err);
    }
}

//아이디 찾기
const findId = async(req,res,next) => {
    const {Email,  UserName} = req.body;
    try{
        const user = await User.findOne({UserName , Email});
        if(!user){
            throw {status: 404, message:"회원정보를 찾을 수 없습니다."};
        }
        res.status(200).json(user.UserId);
    }
    catch(err){
        next(err);
    }
}



module.exports = {loginUser,joinUser,checkId, deleteUser,detailUserAuth,detailUser, chageUser ,changePwd,changePasswordAuth,findId};


