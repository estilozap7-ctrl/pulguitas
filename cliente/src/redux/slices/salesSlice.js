import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const createSale = createAsyncThunk(
    'sales/createSale',
    async (saleData, { rejectWithValue }) => {
        try {
            // Se espera que saleData sea { total: number, staff_id: number, details: [...] } 
            // aunque el backend en los modelos que analizamos capaz requiera adaptar la estructura.
            const response = await api.post('/sales', saleData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al procesar la venta');
        }
    }
);

const initialState = {
    cart: [],
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.cart = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSale.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSale.fulfilled, (state) => {
                state.loading = false;
                state.cart = []; // Limpiar carrito despues de venta exitosa
            })
            .addCase(createSale.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = salesSlice.actions;
export default salesSlice.reducer;
