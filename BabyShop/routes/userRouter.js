 const { Router } = require('express');
 const {joinUser} = require("../controllers/userController");
const router = Router();

router.post("/join",joinUser);

module.exports = router;