const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.post('/', appointmentController.createAppointment);
router.get('/my', appointmentController.getClientAppointments);
router.get('/', appointmentController.getAppointments);
router.put('/:id', appointmentController.updateStatus);

module.exports = router;
