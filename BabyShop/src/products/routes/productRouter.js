const {
  findAllProduct,
  findProductById,
  searchProducts,
} = require("../service/productService");

const { Router } = require("express");
const router = Router();

router.get("/", findAllProduct);
router.get("/:seq", findProductById);
router.get("/search/:search", searchProducts);


module.exports = router;
