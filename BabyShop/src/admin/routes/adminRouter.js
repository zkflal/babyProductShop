const router = require("express").Router();
const {adminLogin} = require("../services/adminService");

router.post('/', adminLogin);

module.exports = router;