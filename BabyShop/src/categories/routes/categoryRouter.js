const {
  findProductByCategory,
  adminCreatecategory,
} = require("../service/categoryService");
const { Router } = require("express");
const router = Router();

router.get("/:id", findProductByCategory);

module.exports = router;
