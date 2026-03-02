const { Animal, User } = require('../models');

exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll({
            where: { owner_id: req.userId }
        });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mascotas', error: error.message });
    }
};

exports.createAnimal = async (req, res) => {
    try {
        const { name } = req.body;
        const newAnimal = await Animal.create({
            name,
            owner_id: req.userId
        });
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar mascota', error: error.message });
    }
};

exports.deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findOne({
            where: { id, owner_id: req.userId }
        });

        if (!animal) return res.status(404).json({ message: 'Mascota no encontrada o no le pertenece' });

        await animal.destroy();
        res.status(200).json({ message: 'Mascota eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar mascota', error: error.message });
    }
};
