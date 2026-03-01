const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.use(verifyToken, isAdmin);

router.post('/categories', adminController.createCategory);
router.get('/categories', adminController.getCategories);
router.post('/products', adminController.createProduct);
router.post('/services', adminController.createService);
router.get('/users', adminController.getUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.post('/availability', adminController.setAvailability);

module.exports = router;
