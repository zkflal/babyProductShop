const {
  findProductByMainCategory,
  adminCreateMainCategory,
  adminCreateSubCategory,
  adminDeleteCategory,
  adminUpdateMainCategory,
  adminUpdateSubCategory,
} = require("../service/categoryService");
const { Router } = require("express");
const router = Router();

router.post("/main", adminCreateMainCategory);
router.post("/sub", adminCreateSubCategory);
router.put("/main", adminUpdateMainCategory);
router.put("/sub", adminUpdateSubCategory);
router.delete("/:en_name", adminDeleteCategory);

module.exports = router;
