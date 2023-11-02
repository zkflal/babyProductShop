const express = require("express");
const router = express.Router();
const {adminLogin} = require("../controllers/adminController");
// const {createProduct, updateProduct, deleteProduct} = require("../controllers/productController");
// const {createCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");
const {adminUpdateOrder, adminDeleteOrder} = require("../controllers/orderController");

// admin account
router.post('/', adminLogin);
// products
// router.post('/products', createProduct);
// router.put('/products', updateProduct);
// router.delete('/products/:productId', deleteProduct);
// // category
// router.post('/categories', createCategory);
// router.put('/categories', updateCategory);
// router.delete('/categories/:categoriId', deleteCategory);
// order
router.put('/orders', adminUpdateOrder);
router.delete('/orders/:orderId', adminDeleteOrder);

module.exports = router;