const router = require("express").Router();
const {findAllByUserId, findOneByOrderId, create, update, cancel} = require("../services/orderService");
const checkToken = require("../../../utils/checkToken");

router.get("/", checkToken, findAllByUserId);
router.get("/:id", findOneByOrderId);
router.post("/", create);
router.put("/", update);
router.put("/:id", cancel);

module.exports = router;