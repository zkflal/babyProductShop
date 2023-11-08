const router = require("express").Router();
const {findAllOrder, findOneOrder, createOrder, updateOrder, cancelOrder} = require("../services/orderService");
const checkToken = require("../../../utils/checkToken");

router.get("/", checkToken, findAllOrder);
router.get("/:id", findOneOrder);
router.post("/", createOrder);
router.put("/", updateOrder);
router.put("/:id", cancelOrder);

module.exports = router;