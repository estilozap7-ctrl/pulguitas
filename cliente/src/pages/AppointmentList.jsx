import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, deleteAppointment, createAppointment } from '../redux/slices/appointmentsSlice';
import { fetchPets } from '../redux/slices/petsSlice';
import { Calendar as CalendarIcon, Clock, X, Plus } from 'lucide-react';

const AppointmentModal = ({ isOpen, onClose, onSubmit, isSubmitting, pets }) => {
    const [formData, setFormData] = useState({ animal_id: '', date: '', description: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ animal_id: '', date: '', description: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Agendar Cita</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Mascota</label>
                        <select
                            value={formData.animal_id}
                            onChange={(e) => setFormData({ ...formData, animal_id: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            required
                        >
                            <option value="">Seleccione una mascota</option>
                            {pets.map(pet => (
                                <option key={pet.id} value={pet.id}>{pet.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Fecha y Hora</label>
                        <input
                            type="datetime-local"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500 [color-scheme:dark]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Motivo/Descripción</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            rows="3"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                        {isSubmitting ? 'Guardando...' : 'Agendar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const AppointmentList = () => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.appointments);
    const { pets } = useSelector((state) => state.pets);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAppointments());
        if (pets.length === 0) dispatch(fetchPets());
    }, [dispatch]);

    const handleCreate = async (data) => {
        // Formatear data para enviar al backend (asume que envia iso date y un service_id ficticio por ahora si el backend lo pide)
        // Actualmente el modelo Pide animal_id, service_id, client_id. 
        // Adaptaremos según la necesidad, enviaremos los datos disponibles
        const result = await dispatch(createAppointment({
            animal_id: data.animal_id,
            date: data.date,
            description: data.description,
            service_id: 1 // TODO: implementar servicios reales
        }));
        if (createAppointment.fulfilled.match(result)) {
            setIsModalOpen(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Cancelar esta cita?')) {
            dispatch(deleteAppointment(id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Citas Programadas</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Agendar Cita</span>
                </button>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl">{error}</div>}

            {loading && appointments.length === 0 ? (
                <div className="text-gray-400 flex justify-center py-12">Cargando citas...</div>
            ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800/50 border-b border-gray-800">
                                <th className="p-4 text-gray-400 font-medium text-sm">Fecha y Hora</th>
                                <th className="p-4 text-gray-400 font-medium text-sm">Mascota</th>
                                <th className="p-4 text-gray-400 font-medium text-sm">Motivo</th>
                                <th className="p-4 text-gray-400 font-medium text-sm text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length === 0 ? (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-500">No hay citas programadas.</td></tr>
                            ) : appointments.map(apt => (
                                <tr key={apt.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><CalendarIcon size={18} /></div>
                                            <div>
                                                <p className="text-white font-medium">{new Date(apt.date || apt.createdAt).toLocaleDateString()}</p>
                                                <p className="text-sm text-gray-400 flex items-center mt-1"><Clock size={12} className="mr-1" /> {new Date(apt.date || apt.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300">
                                        {/* Fallback si el backend incluye la mascota anidada, ej apt.Animal.name */}
                                        Mascota #{apt.animal_id}
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">{apt.description || 'Consulta General'}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleDelete(apt.id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1 rounded transition-colors text-sm">
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
                isSubmitting={loading}
                pets={pets}
            />
        </div>
    );
};

export default AppointmentList;
