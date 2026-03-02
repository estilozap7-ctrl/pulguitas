import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import petsReducer from './slices/petsSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import inventoryReducer from './slices/inventorySlice';
import salesReducer from './slices/salesSlice';
import logsReducer from './slices/logsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        pets: petsReducer,
        appointments: appointmentsReducer,
        inventory: inventoryReducer,
        sales: salesReducer,
        logs: logsReducer,
    },
});

export default store;
