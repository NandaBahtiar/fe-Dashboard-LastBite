import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customers: [],
    pagination: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        fetchCustomersStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchCustomersSuccess(state, action) {
            state.status = 'succeeded';
            state.customers = action.payload.data || [];
            state.pagination = {
                page: action.payload.paging.currentPage - 1,
                size: action.payload.paging.size,
                totalPages: action.payload.paging.totalPage,
                totalElements: action.payload.paging.totalElements,
            };
        },
        fetchCustomersFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const {
    fetchCustomersStart,
    fetchCustomersSuccess,
    fetchCustomersFailure,
} = customerSlice.actions;

export default customerSlice.reducer;
