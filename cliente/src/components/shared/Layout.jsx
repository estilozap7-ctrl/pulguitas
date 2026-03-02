import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { LayoutDashboard, Users, Cat, CalendarHeart, PackageOpen, ShoppingCart, LogOut, FileText } from 'lucide-react';

const SidebarLink = ({ to, icon, label, end }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
        }
    >
        {icon}
        <span className="font-medium">{label}</span>
    </NavLink>
);

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // Determinar qué enlaces mostrar según el rol
    const isAdmin = user?.role === 'ADMIN';
    const isStaff = user?.role === 'STAFF' || isAdmin;

    return (
        <div className="flex h-screen bg-gray-950 text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-wider text-indigo-500">Pulguitas</h1>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{user?.role}</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" end />
                    <SidebarLink to="/mascotas" icon={<Cat size={20} />} label="Mascotas" />
                    <SidebarLink to="/citas" icon={<CalendarHeart size={20} />} label="Citas" />

                    {isStaff && (
                        <>
                            <div className="pt-4 pb-2">
                                <p className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Gestión</p>
                            </div>
                            <SidebarLink to="/inventario" icon={<PackageOpen size={20} />} label="Inventario" />
                            <SidebarLink to="/pos" icon={<ShoppingCart size={20} />} label="Punto de Venta" />
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <div className="pt-4 pb-2">
                                <p className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Administración</p>
                            </div>
                            {/* <SidebarLink to="/usuarios" icon={<Users size={20} />} label="Usuarios" /> */}
                            <SidebarLink to="/auditoria" icon={<FileText size={20} />} label="Auditoría" />
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2 rounded-xl bg-gray-800">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full h-full relative">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
