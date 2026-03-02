import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAppointments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/appointments');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener citas');
        }
    }
);

export const createAppointment = createAsyncThunk(
    'appointments/createAppointment',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/appointments', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al agendar cita');
        }
    }
);

export const deleteAppointment = createAsyncThunk(
    'appointments/deleteAppointment',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/appointments/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al cancelar cita');
        }
    }
);

const initialState = {
    appointments: [],
    loading: false,
    error: null,
};

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createAppointment.pending, (state) => { state.loading = true; })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments.push(action.payload);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAppointment.pending, (state) => { state.loading = true; })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = state.appointments.filter(a => a.id !== action.payload);
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default appointmentsSlice.reducer;
