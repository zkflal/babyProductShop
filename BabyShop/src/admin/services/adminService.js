const adminModel = require("../models/adminModel");

// 관리자 로그인
const adminLogin = async (req, res, next)=>{
    const {AdminId, HashPwd} = req.body;
    try{
        const admin = await adminModel.findOne({
            AdminId
        });
        if(admin && admin.AdminId === AdminId && admin.HashPwd === HashPwd){
            res.status(200).send("성공적으로 로그인 했습니다.")
        }else{
            throw new Error("어드민 계정이 확인되지 않았습니다.");
        }
    }catch(err){
        err.status = 403;
        next(err);
    } 
}

module.exports = {adminLogin};