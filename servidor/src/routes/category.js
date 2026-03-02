const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isStaffOrAdmin } = require('../middleware/authMiddleware');

router.get('/', verifyToken, categoryController.getCategories);
router.post('/', verifyToken, isStaffOrAdmin, categoryController.createCategory);
router.put('/:id', verifyToken, isStaffOrAdmin, categoryController.updateCategory);
router.delete('/:id', verifyToken, isStaffOrAdmin, categoryController.deleteCategory);

module.exports = router;
