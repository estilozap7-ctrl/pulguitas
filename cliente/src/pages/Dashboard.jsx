import React from 'react';
import { useSelector } from 'react-redux';
import { Activity, Users, Calendar, ShoppingBag } from 'lucide-react';

const DashboardCard = ({ icon, title, value, color }) => (
    <div className={`p-6 rounded-2xl border border-gray-800 bg-gray-900 flex items-center space-x-4 hover:border-${color}-500 transition-colors`}>
        <div className={`p-4 rounded-xl bg-${color}-500/10 text-${color}-500`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Hola, {user?.name || 'Usuario'}</h1>
                <p className="text-gray-400 mt-2">Bienvenido al panel de control de Pulguitas.</p>
            </header>

            {/* Aqui podriamos mostrar diferentes cosas segun el rol */}
            {user?.role !== 'CLIENT' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard icon={<Users size={24} />} title="Clientes" value="24" color="indigo" />
                    <DashboardCard icon={<Calendar size={24} />} title="Citas Hoy" value="8" color="indigo" />
                    <DashboardCard icon={<ShoppingBag size={24} />} title="Ventas del Mes" value="$12k" color="indigo" />
                    <DashboardCard icon={<Activity size={24} />} title="Actividad" value="98%" color="indigo" />
                </div>
            )}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-white mb-4">Próximos Pasos</h2>
                <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span>Registrar nuevas mascotas desde el panel lateral</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span>Revisar las citas programadas para hoy</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span>Verificar el stock de productos en el inventario</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
