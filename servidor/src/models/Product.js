const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    target_animal: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Todos'
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    features: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: true // Puede dejarse null temporalmente para registros antiguos
    },
    life_stage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Todas las edades'
    }
}, {
    timestamps: true
});

module.exports = Product;
