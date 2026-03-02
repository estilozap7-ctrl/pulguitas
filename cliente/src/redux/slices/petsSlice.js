import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunks
export const fetchPets = createAsyncThunk(
    'pets/fetchPets',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/animals');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener mascotas');
        }
    }
);

export const createPet = createAsyncThunk(
    'pets/createPet',
    async (petData, { rejectWithValue }) => {
        try {
            const response = await api.post('/animals', petData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al crear mascota');
        }
    }
);

export const updatePet = createAsyncThunk(
    'pets/updatePet',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/animals/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al actualizar mascota');
        }
    }
);

export const deletePet = createAsyncThunk(
    'pets/deletePet',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/animals/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al eliminar mascota');
        }
    }
);

const initialState = {
    pets: [],
    loading: false,
    error: null,
};

const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        clearPetsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Pets
            .addCase(fetchPets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPets.fulfilled, (state, action) => {
                state.loading = false;
                state.pets = action.payload; // Asumiendo que devuelve un array
            })
            .addCase(fetchPets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Pet
            .addCase(createPet.pending, (state) => { state.loading = true; })
            .addCase(createPet.fulfilled, (state, action) => {
                state.loading = false;
                state.pets.push(action.payload);
            })
            .addCase(createPet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Pet
            .addCase(updatePet.pending, (state) => { state.loading = true; })
            .addCase(updatePet.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.pets.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.pets[index] = action.payload;
                }
            })
            .addCase(updatePet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Pet
            .addCase(deletePet.pending, (state) => { state.loading = true; })
            .addCase(deletePet.fulfilled, (state, action) => {
                state.loading = false;
                state.pets = state.pets.filter(p => p.id !== action.payload);
            })
            .addCase(deletePet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPetsError } = petsSlice.actions;
export default petsSlice.reducer;
