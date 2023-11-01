 const { Router } = require('express');
 const {joinUser} = require("../controllers/userController");
const router = Router();

router.post("/users",joinUser);

module.exports = router;