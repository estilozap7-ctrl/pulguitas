const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ActivityLog = sequelize.define('ActivityLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false // e.g., 'CREACION', 'VACUNA', 'VENTA', 'CIRUGÍA'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    entity_type: {
        type: DataTypes.ENUM('SISTEMA', 'MASCOTA', 'VENTA', 'CITA'),
        defaultValue: 'SISTEMA'
    }
}, {
    timestamps: true
});

module.exports = ActivityLog;
