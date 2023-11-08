const {
  findProductByCategory,
  findMainCategory,
  findSubCategory,
} = require("../service/categoryService");
const { Router } = require("express");
const router = Router();

router.get("/main", findMainCategory);
router.get("/sub", findSubCategory);
router.get("products/:en_name", findProductByCategory);
// router.get('/child', )

module.exports = router;
