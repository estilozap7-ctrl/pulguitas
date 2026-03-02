import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchLogs = createAsyncThunk(
    'logs/fetchLogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/activity-logs');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener bitácora');
        }
    }
);

const initialState = {
    logs: [],
    loading: false,
    error: null,
};

const logsSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = action.payload;
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default logsSlice.reducer;
