const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const appointmentRoutes = require('./appointment');
const activityLogRoutes = require('./activityLog');
const saleRoutes = require('./sale');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const subcategoryRoutes = require('./subcategory');
const animalRoutes = require('./animal');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/activity-log', activityLogRoutes);
router.use('/sales', saleRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/animals', animalRoutes);

module.exports = router;
