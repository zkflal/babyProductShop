const router = require("express").Router();
const {adminLogin, adminSignup} = require("../services/adminService");

router.post('/login', adminLogin);
router.post('/signup', adminSignup);

module.exports = router;