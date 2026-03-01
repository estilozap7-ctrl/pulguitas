const { Appointment, Animal, Service, User } = require('../models');
const { logActivity } = require('../utils/activityLogger');


exports.createAppointment = async (req, res) => {
    try {
        const { animal_id, service_id, staff_id, start_time, notes } = req.body;
        const client_id = req.userId;

        const service = await Service.findByPk(service_id);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });

        const start = new Date(start_time);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1hr

        const appointment = await Appointment.create({
            animal_id,
            service_id,
            client_id,
            staff_id,
            start_time: start,
            end_time: end,
            final_cost: service.price,
            notes
        });

        // Registrar Log de Actividad
        await logActivity({
            action: 'CITA_CREADA',
            description: `Nueva cita para ${service.name} el ${start.toLocaleString()}`,
            userId: client_id,
            entityType: 'CITA',
            animalId: animal_id
        });

        res.status(201).json(appointment);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getClientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: { client_id: req.userId },
            include: [Animal, Service]
        });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        let appointments;
        if (req.user.role === 'ADMIN') {
            appointments = await Appointment.findAll({ include: [Animal, Service, User] });
        } else {
            appointments = await Appointment.findAll({
                where: { staff_id: req.userId },
                include: [Animal, Service]
            });
        }
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, final_cost } = req.body;

        const appointment = await Appointment.findByPk(id, { include: [Service] });
        if (!appointment) return res.status(404).json({ message: 'Cita no encontrada' });

        const oldStatus = appointment.status;
        await appointment.update({ status: status || oldStatus, final_cost: final_cost || appointment.final_cost });

        // Registrar Log de Actividad (Historial Médico)
        await logActivity({
            action: 'CITA_ESTADO_ACTUALIZADO',
            description: `Estado cambiado de ${oldStatus} a ${status} para el servicio ${appointment.Service.name}`,
            userId: req.userId,
            entityType: 'MASCOTA',
            animalId: appointment.animal_id
        });

        res.status(200).json({ message: 'Estado de cita actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

