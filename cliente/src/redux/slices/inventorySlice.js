import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchProducts = createAsyncThunk(
    'inventory/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener productos');
        }
    }
);

export const createProduct = createAsyncThunk(
    'inventory/createProduct',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/products', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al crear producto');
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'inventory/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener categorías');
        }
    }
);

export const createCategory = createAsyncThunk(
    'inventory/createCategory',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/categories', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al crear categoría');
        }
    }
);

export const fetchSubcategories = createAsyncThunk(
    'inventory/fetchSubcategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/subcategories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al obtener subcategorías');
        }
    }
);

export const createSubcategory = createAsyncThunk(
    'inventory/createSubcategory',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/subcategories', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al crear subcategoría');
        }
    }
);

const initialState = {
    products: [],
    categories: [],
    subcategories: [],
    loading: false,
    error: null,
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => { state.loading = true; })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCategory.pending, (state) => { state.loading = true; })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Subcategories
            .addCase(fetchSubcategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubcategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories = action.payload;
            })
            .addCase(fetchSubcategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSubcategory.pending, (state) => { state.loading = true; })
            .addCase(createSubcategory.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories.push(action.payload);
            })
            .addCase(createSubcategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default inventorySlice.reducer;
