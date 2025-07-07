import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    patners: [],
    pagination: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const patnerSlice = createSlice({
    name: 'patners',
    initialState,
    reducers: {
        fetchPatnersStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchPatnersSuccess(state, action) {
            state.status = 'succeeded';
            state.patners = action.payload.data || [];
            state.pagination = {
                page: (action.payload.pagination.page || 1) - 1,
                size: action.payload.pagination.size || 0,
                totalPages: action.payload.pagination.totalPages || 1,
                totalElements: action.payload.pagination.totalElements || 0,
            };
        },
        fetchPatnersFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const {
    fetchPatnersStart,
    fetchPatnersSuccess,
    fetchPatnersFailure,
} = patnerSlice.actions;

export default patnerSlice.reducer;