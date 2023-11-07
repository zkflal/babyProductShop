const {
  findProductByCategory,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  findParentCategory,
} = require("../service/categoryService");
const { Router } = require("express");
const router = Router();

router.get("/parents", findParentCategory);
router.post("/", adminCreateCategory);
router.put("/", adminUpdateCategory);
router.delete("/:name", adminDeleteCategory);

module.exports = router;
