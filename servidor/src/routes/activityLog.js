const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');

router.get('/', activityLogController.listAll);
router.get('/animal/:animalId', activityLogController.getForAnimal);
router.get('/sale/:saleId', activityLogController.getForSale);

module.exports = router;
