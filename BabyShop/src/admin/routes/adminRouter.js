const router = require("express").Router();
const {adminLogin, adminJoin} = require("../services/adminService");

router.post('/login', adminLogin);
router.post('/join', adminJoin);

module.exports = router;