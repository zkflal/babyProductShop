const adminModel = require("../models/adminModel");

const createAccout = async (req, res)=>{
    const {id, password} = req.body;
    try{
        await adminModel.create({
            AdminId: id,
            AdminPWD: password
        });
        res.status(200).end();
    }catch(err){
        res.status(400).end();
    }
}

const findAccount = async (req, res)=>{
    const {id, password} = req.body;
    try{
        const admin = await adminModel.findOne({
            AdminId:id
        });
        if(admin.AdminId === id && admin.AdminPWD === password){
            res.status(200).end();
        }else{
            throw new Error("403 Forbidden : 어드민 계정이 확인되지 않았습니다.");
        }
    }catch(err){
        res.status(403).end();
    }
    
}

module.exports = {createAccout, findAccount};