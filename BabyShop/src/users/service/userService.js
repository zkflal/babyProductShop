const {User} = require("../models/user");
const hashPassword = require("../../../utils/hashedPwd");

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
        next();    
    }
}

//회원 탈퇴
const deleteUser = async(req,res,next) =>{
    const {userid} = req.params;
    try{
        await User.deleteOne({UserId: userid});
        res.status(200).end("삭제 성공");
    }
    catch(err){
        console.log(err);
        next();
    }
}

//회원 정보 보여주기
const detailUser = async(req,res,next) => {
    const {userid} = req.params;
    try{
        const userdetail = await User.find({ UserId : userid});
        console.log(userdetail);
        res.status(200).json(userdetail).end();
    }
    catch(err){
        console.log(err);
       next("정보없음");
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
        next("수정 실패")
    }  
}

//비밀번호 변경
const changePwd = async(req,res,next) => {

}


module.exports = {joinUser, deleteUser,detailUser, chageUser};