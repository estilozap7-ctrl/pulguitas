const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin, isStaffOrAdmin } = require('../middleware/authMiddleware');

// Get all products (Public or Auth based on business logic, here we'll leave it public for the sake of frontend POS fetching, or protect it. Protect it for now)
router.get('/', verifyToken, productController.getProducts);

// Create, Update, Delete (Admin only)
router.post('/', verifyToken, isAdmin, productController.createProduct);
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
