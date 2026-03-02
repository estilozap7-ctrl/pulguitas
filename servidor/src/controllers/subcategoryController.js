const { Subcategory, Category } = require('../models');

exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll({
            include: [{ model: Category, as: 'category' }]
        });
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subcategories', error: error.message });
    }
};

exports.createSubcategory = async (req, res) => {
    const { name, category_id } = req.body;
    try {
        const categoryExists = await Category.findByPk(category_id);
        if (!categoryExists) return res.status(404).json({ message: 'Category not found' });

        const newSubcategory = await Subcategory.create({
            name,
            category_id
        });
        res.status(201).json(newSubcategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subcategory', error: error.message });
    }
};

exports.deleteSubcategory = async (req, res) => {
    const { id } = req.params;
    try {
        const subcategory = await Subcategory.findByPk(id);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

        await subcategory.destroy();
        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subcategory', error: error.message });
    }
};
