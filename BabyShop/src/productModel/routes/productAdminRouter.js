const {
  findAllProduct,
  findProductById,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} = require("../service/productService");

const { Router } = require("express");
const router = Router();

router.post("/", adminCreateProduct);
router.put("/", adminUpdateProduct);
router.delete("/:id", adminDeleteProduct);

module.exports = router;
