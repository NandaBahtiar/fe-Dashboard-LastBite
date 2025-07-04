import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sellerDetail: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const sellerDetailSlice = createSlice({
    name: 'sellerDetail',
    initialState,
    reducers: {
        fetchSellerDetailStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchSellerDetailSuccess(state, action) {
            state.status = 'succeeded';
            state.sellerDetail = action.payload;
        },
        fetchSellerDetailFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        clearSellerDetail(state) {
            state.sellerDetail = null;
            state.status = 'idle';
            state.error = null;
        },
    },
});

export const {
    fetchSellerDetailStart,
    fetchSellerDetailSuccess,
    fetchSellerDetailFailure,
    clearSellerDetail,
} = sellerDetailSlice.actions;

export default sellerDetailSlice.reducer;