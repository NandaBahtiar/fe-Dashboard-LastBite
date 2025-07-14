import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    pagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    },
    loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
};

const customerOrdersSlice = createSlice({
    name: 'customerOrders',
    initialState,
    reducers: {
        fetchCustomerOrdersStart(state) {
            state.loading = 'pending';
            state.error = null;
        },
        fetchCustomerOrdersSuccess(state, action) {
            state.loading = 'succeeded';
            state.orders = action.payload.data || [];
            state.pagination = {
                page: action.payload.paging.page || 0,
                size: action.payload.paging.size || 0,
                totalPages: action.payload.paging.totalPages || 0,
                totalElements: action.payload.paging.totalElements || 0,
            };
            
        },
        fetchCustomerOrdersFailure(state, action) {
            state.loading = 'failed';
            state.error = action.payload;
        },
        clearCustomerOrders(state) {
            state.orders = [];
            state.pagination = {
                page: 0,
                size: 10,
                totalPages: 0,
                totalElements: 0,
            };
            state.loading = 'idle';
            state.error = null;
        },
    },
});

export const {
    fetchCustomerOrdersStart,
    fetchCustomerOrdersSuccess,
    fetchCustomerOrdersFailure,
    clearCustomerOrders,
} = customerOrdersSlice.actions;

export default customerOrdersSlice.reducer;
