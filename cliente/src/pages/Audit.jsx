import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../redux/slices/logsSlice';
import { FileText, Clock, User, Info } from 'lucide-react';

const Audit = () => {
    const dispatch = useDispatch();
    const { logs, loading, error } = useSelector((state) => state.logs);

    useEffect(() => {
        dispatch(fetchLogs());
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <FileText className="mr-3 text-indigo-500" /> Auditoría del Sistema
                </h1>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl">{error}</div>}

            {loading && logs.length === 0 ? (
                <div className="text-gray-400 flex justify-center py-12">Cargando registros...</div>
            ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800/50 border-b border-gray-800">
                                <th className="p-4 text-gray-400 font-medium text-sm">Fecha/Hora</th>
                                <th className="p-4 text-gray-400 font-medium text-sm">Acción</th>
                                <th className="p-4 text-gray-400 font-medium text-sm">Entidad</th>
                                <th className="p-4 text-gray-400 font-medium text-sm">Usuario ID</th>
                                <th className="p-4 text-gray-400 font-medium text-sm">Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No hay registros de actividad.</td></tr>
                            ) : logs.map(log => (
                                <tr key={log.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                                    <td className="p-4">
                                        <div className="text-white text-sm">{new Date(log.createdAt).toLocaleDateString()}</div>
                                        <div className="text-gray-500 text-xs flex items-center mt-1"><Clock size={10} className="mr-1" />{new Date(log.createdAt).toLocaleTimeString()}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded text-xs font-semibold uppercase tracking-wider">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-300 text-sm">{log.entity_type}</td>
                                    <td className="p-4 text-gray-400 text-sm flex items-center">
                                        <User size={14} className="mr-1" /> {log.user_id || 'Sistema'}
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm max-w-xs truncate" title={log.description}>
                                        <Info size={14} className="inline mr-1 text-gray-500" />
                                        {log.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Audit;
