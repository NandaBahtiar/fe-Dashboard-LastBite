import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menu: [],
    pagination: null,
    loading: false,
    error: null,
};

const sellerMenuSlice = createSlice({
    name: 'sellerMenu',
    initialState,
    reducers: {
        fetchSellerMenuStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSellerMenuSuccess(state, action) {
            state.loading = false;
            state.menu = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        fetchSellerMenuFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSellerMenuStart,
    fetchSellerMenuSuccess,
    fetchSellerMenuFailure,
} = sellerMenuSlice.actions;

export default sellerMenuSlice.reducer;