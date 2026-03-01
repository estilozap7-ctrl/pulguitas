const { ActivityLog } = require('../models');

/**
 * Registra una actividad en el sistema.
 * @param {Object} params
 * @param {string} params.action - Nombre de la acción (EJ: 'CREACION', 'VENTA', 'VACCUNA')
 * @param {string} params.description - Detalles técnicos o humanos de la acción
 * @param {number} params.userId - Quien realizó la acción
 * @param {string} params.entityType - 'SISTEMA', 'MASCOTA', 'VENTA', 'CITA'
 * @param {number} [params.animalId] - ID de la mascota relacionada (opcional)
 * @param {number} [params.saleId] - ID de la venta relacionada (opcional)
 */
const logActivity = async ({ action, description, userId, entityType, animalId, saleId }) => {
    try {
        await ActivityLog.create({
            action,
            description,
            user_id: userId,
            entity_type: entityType,
            animal_id: animalId,
            sale_id: saleId
        });
        console.log(`[LOG REC]: ${action} por usuario ID: ${userId}`);
    } catch (error) {
        console.error('Error al registrar actividad en log:', error);
    }
};

module.exports = { logActivity };
