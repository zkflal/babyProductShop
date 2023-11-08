const adminModel = require("../models/adminModel");
const hashPassword = require("../../../utils/hashedPwd");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// 관리자 로그인
const adminLogin = async (req, res, next)=>{
    const {admin_id, password} = req.body;
    const hashedPwd = hashPassword(password);
    try{
        const admin = await adminModel.findOne({
            AdminId: admin_id,
            HashPwd: hashedPwd
        });
        console.log(admin);
        if(!admin){
            throw {status:404, message:"어드민 계정이 확인되지 않았습니다."};
        }
        token = jwt.sign({
            type:'JWT',
            UserId:admin_id,
            Admin:true
        },
            SECRET_KEY
        );
        res.status(200).json({token:token, message:"성공적으로 로그인 했습니다."});
    }catch(err){
        next(err);
    } 
}

const adminJoin = async (req, res, next)=>{
    const { AdminId, HashPwd } = req.body;
    try{
        const isAdmin = await adminModel.findOne({AdminId});
        if(isAdmin){
            throw {status:400, message:"관리자가 존재합니다."};
        }
        await adminModel.create({
            AdminId, 
            HashPwd:hashPassword(HashPwd)
        })
        res.status(200).send("성공적으로 관리자 계정을 생성했습니다.")
    }catch(err){
        next(err);
    }
}

module.exports = {adminLogin, adminJoin};