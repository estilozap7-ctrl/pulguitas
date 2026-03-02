const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, animalController.getAnimals);
router.post('/', verifyToken, animalController.createAnimal);
router.delete('/:id', verifyToken, animalController.deleteAnimal);

module.exports = router;
