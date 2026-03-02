const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { verifyToken, isStaffOrAdmin } = require('../middleware/authMiddleware');

router.get('/', verifyToken, subcategoryController.getSubcategories);
router.post('/', verifyToken, isStaffOrAdmin, subcategoryController.createSubcategory);
router.delete('/:id', verifyToken, isStaffOrAdmin, subcategoryController.deleteSubcategory);

module.exports = router;
