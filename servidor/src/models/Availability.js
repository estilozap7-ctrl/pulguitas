const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Availability = sequelize.define('Availability', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    day_of_week: {
        type: DataTypes.ENUM('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'),
        allowNull: false
    },
    start_hour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_hour: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Availability;
