const adminModel = require("../models/adminModel");

// 관리자 로그인
const adminLogin = async (req, res)=>{
    const {AdminId, HashPwd} = req.body;
    try{
        const admin = await adminModel.findOne({
            AdminId
        });
        if(admin.AdminId === AdminId && admin.HashPwd === HashPwd){
            res.status(200).end();
        }
    }catch(err){
        res.status(403).json("403 Forbidden : 어드민 계정이 확인되지 않았습니다.");
    } 
}

module.exports = {adminLogin};