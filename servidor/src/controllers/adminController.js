const { Category, Product, Service, User, Availability } = require('../models');
const { logActivity } = require('../utils/activityLogger');


exports.createCategory = async (req, res) => {
    try {
        const { name, type } = req.body;
        const category = await Category.create({ name, type });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;
        const product = await Product.create({ name, description, price, stock, category_id });

        // Registrar actividad
        await logActivity({
            action: 'CREACION_PRODUCTO',
            description: `Se creó el producto: ${name} con stock inicial de ${stock}`,
            userId: req.user ? req.user.id : 1, // Fallback al admin inicial
            entityType: 'SISTEMA'
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createService = async (req, res) => {
    try {
        const { name, description, price, category_id } = req.body;
        const service = await Service.create({ name, description, price, category_id });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        await User.update({ role }, { where: { id } });
        res.status(200).json({ message: 'Rol de usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.setAvailability = async (req, res) => {
    try {
        const { staff_id, day_of_week, start_hour, end_hour } = req.body;
        const availability = await Availability.create({ staff_id, day_of_week, start_hour, end_hour });
        res.status(201).json(availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
