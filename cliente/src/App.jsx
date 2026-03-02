import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout
import Layout from './components/shared/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PetList from './pages/PetList';
import AppointmentList from './pages/AppointmentList';
import Inventory from './pages/Inventory';
import POS from './pages/POS';
import Audit from './pages/Audit';

// Rutas Protegidas
const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    if (loading) return <div>Cargando...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />; // O a una pagina de 'No autorizado'
    }

    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Rutas Publicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas Privadas envueltas en Layout */}
                <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="mascotas" element={<PetList />} />
                    <Route path="citas" element={<AppointmentList />} />
                    <Route path="inventario" element={<PrivateRoute allowedRoles={['ADMIN', 'STAFF']}><Inventory /></PrivateRoute>} />
                    <Route path="pos" element={<PrivateRoute allowedRoles={['ADMIN', 'STAFF']}><POS /></PrivateRoute>} />
                    <Route path="auditoria" element={<PrivateRoute allowedRoles={['ADMIN']}><Audit /></PrivateRoute>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
