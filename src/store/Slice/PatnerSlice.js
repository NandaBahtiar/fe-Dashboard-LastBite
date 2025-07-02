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
                page: action.payload.paging.currentPage - 1,
                size: action.payload.paging.size,
                totalPages: action.payload.paging.totalPage,
                totalElements: action.payload.paging.totalElements,
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