 const { Router } = require('express');
 const {joinUser, deleteUser, detailUser ,chageUser} = require("../service/userService");
const router = Router();

router.post("/join",joinUser);
router.delete("/:userid",deleteUser);
router.get("/:userid",detailUser);
router.put("/",chageUser);

module.exports = router;