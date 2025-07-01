import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

// Async thunk for fetching customers
export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/users', {
                params: {
                    role: 'ROLE_CUSTOMER',
                    page: params.page || 0,
                    size: params.size || 10,
                    sortField: params.sortField || 'createdAt',
                    sortDir: params.sortDir || 'desc',
                    ...params,
                },
            });
            return response.data.data; // Return the 'data' object from the response
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    customers: [],
    pagination: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload.content || [];
                state.pagination = {
                    page: action.payload.number,
                    size: action.payload.size,
                    totalPages: action.payload.totalPages,
                    totalElements: action.payload.totalElements,
                };
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default customerSlice.reducer;