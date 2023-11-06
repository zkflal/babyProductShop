 const { Router } = require('express');
 const {loginUser,joinUser, deleteUser, detailUser ,chageUser, changePwd} = require("../service/userService");
 const checkToken = require("../../../utils/checkToken");

const router = Router();

router.post("/login",loginUser);
router.post("/join",joinUser);
router.delete("/:userid",checkToken,deleteUser);
router.get("/:userid",checkToken,detailUser);
router.put("/",checkToken,chageUser);
router.put("/password",checkToken,changePwd)


module.exports = router;