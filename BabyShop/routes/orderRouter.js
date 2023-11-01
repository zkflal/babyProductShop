const express = require("express");
const router = express.Router();
const {findAllOrder, createOrder, updateOrderInfo, updateOrderStatus} = require("../controllers/orderController");

// userName에 맞는 모든 order 검색
router.get("/:userName", findAllOrder);
// order 생성
router.post("/", createOrder);
// 이름, 주소, 전화번호, 이메일 변경
router.put("/infos/:orderId", updateOrderInfo);
// 주문 상태 변경
router.put("/status/:orderId", updateOrderStatus);

module.exports = router;