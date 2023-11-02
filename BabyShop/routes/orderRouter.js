const express = require("express");
const router = express.Router();
const {findAllOrder, findOneOrder, createOrder, updateOrder, cancelOrder} = require("../controllers/orderController");

router.get("/all/:UserName", findAllOrder);
router.get("/one/:orderId", findOneOrder);
router.post("/", createOrder);
router.put("/infos", updateOrder);
router.put("/:orderId", cancelOrder);

module.exports = router;