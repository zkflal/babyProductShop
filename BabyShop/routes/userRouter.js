 const { Router } = require('express');
 const {joinUser, deleteUser} = require("../controllers/userController");
const router = Router();

router.post("/join",joinUser);
router.delete("/:userid",deleteUser);
module.exports = router;