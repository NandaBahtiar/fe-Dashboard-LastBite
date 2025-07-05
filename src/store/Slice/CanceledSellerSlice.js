import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
};

const canceledSellerSlice = createSlice({
    name: 'canceledSeller',
    initialState,
    reducers: {
        canceledSellerStart(state) {
            state.loading = true;
            state.error = null;
        },
        canceledSellerSuccess(state) {
            state.loading = false;
        },
        canceledSellerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    canceledSellerStart,
    canceledSellerSuccess,
    canceledSellerFailure,
} = canceledSellerSlice.actions;

export default canceledSellerSlice.reducer;