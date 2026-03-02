import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, deletePet, createPet } from '../redux/slices/petsSlice';
import { Plus, Trash2, Edit3, X } from 'lucide-react';

const PetModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
        setName('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Registrar Mascota</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Nombre de la Mascota</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    {/* Nota: si es ADMIN, podría requerir un selector de owner_id. Por ahora asumimos que backend asocia con config token */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const PetList = () => {
    const dispatch = useDispatch();
    const { pets, loading, error } = useSelector((state) => state.pets);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchPets());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar mascota?')) {
            dispatch(deletePet(id));
        }
    };

    const handleCreate = async (petData) => {
        const result = await dispatch(createPet(petData));
        if (createPet.fulfilled.match(result)) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Mis Mascotas</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Añadir Mascota</span>
                </button>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl">{error}</div>}

            {loading && pets.length === 0 ? (
                <div className="text-gray-400 flex justify-center py-12">Cargando mascotas...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.length === 0 && <div className="col-span-full text-center text-gray-500 py-12">No hay mascotas registradas.</div>}
                    {pets.map((pet) => (
                        <div key={pet.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">{pet.name}</h3>
                                <p className="text-sm text-gray-400 mt-1">Registrado el {new Date(pet.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                {/* <button className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"><Edit3 size={18} /></button> */}
                                <button
                                    onClick={() => handleDelete(pet.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <PetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
                isSubmitting={loading}
            />
        </div>
    );
};

export default PetList;
