const {
  findProductByCategory,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} = require("../service/categoryService");
const { Router } = require("express");
const router = Router();

router.post("/", adminCreateCategory);
router.put("/", adminUpdateCategory);
router.delete("/", adminDeleteCategory);

module.exports = router;
