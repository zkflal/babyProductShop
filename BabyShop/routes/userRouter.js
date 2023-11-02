 const { Router } = require('express');
 const {joinUser, deleteUser, detailUser} = require("../controllers/userController");
const router = Router();

router.post("/join",joinUser);
router.delete("/:userid",deleteUser);
router.get("/:userid",detailUser);

module.exports = router;