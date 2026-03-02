const { Product, Subcategory, Category } = require('../models');
const { logActivity } = require('../utils/activityLogger');

exports.getProducts = async (req, res) => {
    const { category_id, subcategory_id } = req.query;
    try {
        let where = {};
        if (subcategory_id) {
            where.subcategory_id = subcategory_id;
        }

        const products = await Product.findAll({
            where,
            include: [
                {
                    model: Subcategory,
                    as: 'subcategory',
                    required: category_id ? true : false,
                    include: [
                        {
                            model: Category,
                            as: 'category',
                            where: category_id ? { id: category_id } : {}
                        }
                    ]
                }
            ]
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, stock, subcategory_id, target_animal, life_stage, brand, features } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            subcategory_id,
            target_animal,
            life_stage,
            brand,
            features
        });

        // Registrar actividad
        await logActivity({
            action: 'CREACION_PRODUCTO',
            description: `Admin creó el producto: ${name} con stock inicial de ${stock}`,
            userId: req.userId,
            entityType: 'SISTEMA'
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, subcategory_id, target_animal, life_stage, brand, features } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        await product.update({
            name,
            description,
            price,
            stock,
            subcategory_id,
            target_animal,
            life_stage,
            brand,
            features
        });

        // Registrar actividad
        await logActivity({
            action: 'EDICION_PRODUCTO',
            description: `Admin actualizó el producto: ${name}`,
            userId: req.userId,
            entityType: 'SISTEMA'
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
