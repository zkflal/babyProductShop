const {
  findProductByCategory,
  adminCreatecategory,
} = require("../service/categoryService");
const { Router } = require("express");
const router = Router();

router.get("/:category", findProductByCategory);

module.exports = router;
