const {
  findAllProduct,
  findProductById,
  createProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} = require("../service/productService");

const { Router } = require("express");
const router = Router();

router.get("/", findAllProduct);
router.get("/:productId", findProductById);

module.exports = router;
