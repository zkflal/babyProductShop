const router = require("express").Router();
const {adminUpdateOrder, adminDeleteOrder} = require("../services/orderService");

router.put('/', adminUpdateOrder);
router.delete('/:id', adminDeleteOrder);

module.exports = router;