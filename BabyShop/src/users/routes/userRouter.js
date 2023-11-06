 const { Router } = require('express');
 const {loginUser,joinUser, deleteUser, detailUser ,chageUser} = require("../service/userService");

const router = Router();

router.post("/login",loginUser);
router.post("/join",joinUser);
router.delete("/:userid",deleteUser);
router.get("/:userid",detailUser);
router.put("/",chageUser);
// router.put("/password",changePwd); 토큰 유효한지 검사하는 미들웨어 추가예정


module.exports = router;
