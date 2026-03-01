const { ActivityLog, User, Animal, Sale } = require('../models');

exports.listAll = async (req, res) => {
    try {
        const logs = await ActivityLog.findAll({
            include: [
                { model: User, as: 'author', attributes: ['name', 'role'] },
                { model: Animal, attributes: ['name', 'species'] },
                { model: Sale, attributes: ['total', 'paymentMethod'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los logs', error: error.message });
    }
};

exports.getForAnimal = async (req, res) => {
    const { animalId } = req.params;
    try {
        const logs = await ActivityLog.findAll({
            where: { animal_id: animalId },
            include: [{ model: User, as: 'author', attributes: ['name'] }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener historial médico', error: error.message });
    }
};

exports.getForSale = async (req, res) => {
    const { saleId } = req.params;
    try {
        const logs = await ActivityLog.findAll({
            where: { sale_id: saleId },
            include: [{ model: User, as: 'author', attributes: ['name'] }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tracking de venta', error: error.message });
    }
};
