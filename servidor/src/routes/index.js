const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const appointmentRoutes = require('./appointment');
const activityLogRoutes = require('./activityLog');
const saleRoutes = require('./sale');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/activity-log', activityLogRoutes);
router.use('/sales', saleRoutes);

module.exports = router;
