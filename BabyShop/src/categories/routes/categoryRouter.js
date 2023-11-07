const { findProductByCategory } = require("../service/categoryService");
const { Router } = require("express");
const router = Router();

router.get("/:id", findProductByCategory);
// router.get('/child', )

module.exports = router;
