const router = require("express").Router();
const {adminUpdate, adminDelete} = require("../services/orderService");

router.put('/', adminUpdate);
router.delete('/:id', adminDelete);

module.exports = router;