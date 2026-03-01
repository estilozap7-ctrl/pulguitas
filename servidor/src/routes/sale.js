const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.post('/', saleController.createSale);
router.get('/', saleController.getSales);

module.exports = router;
