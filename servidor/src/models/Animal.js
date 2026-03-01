const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING, // Perro, Gato, etc
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true
});

module.exports = Animal;
