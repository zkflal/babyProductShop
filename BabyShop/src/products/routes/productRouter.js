const {
  findAllProduct,
  findProductById,
  searchProducts,
} = require("../service/productService");

const { Router } = require("express");
const router = Router();

router.get("/search", searchProducts);
router.get("/:seq", findProductById);
router.get("/", findAllProduct);


module.exports = router;
