import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api', // Ajustar puerto si el servidor usa otro (usualmente 5000 o 3001)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the standard auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration or unauthorized access
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expiro o no valido, cerrar sesion
            localStorage.removeItem('token');
            // Opcional: Redirigir al login o despachar accion de logout si se integra directamente con store
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
