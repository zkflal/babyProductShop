 const { Router } = require('express');
 const {loginUser,joinUser, deleteUser, detailUserAuth,detailUser ,chageUser, changePwd, changePasswordAuth} = require("../service/userService");
 const checkToken = require("../../../utils/checkToken");

const router = Router();

router.post("/login",loginUser); //로그인
router.post("/join",joinUser); //회원가입
router.delete("/:userid",checkToken,deleteUser); //회원탈퇴
router.post("/",checkToken,detailUserAuth); //사용자 정보 조회용 본인인증
router.get("/:userid",checkToken,detailUser); //사용자 정보 조회
router.put("/",checkToken,chageUser); //사용자 정보 변경
router.put("/password",checkToken,changePwd); //사용자 비밀번호 번호 찾기 -> 새로운 비밀번호로 변경
router.post("/password",changePasswordAuth); // 사용자 비밀번호 찾기 전 본인인증


module.exports = router;