import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
};

const deleteSellerSlice = createSlice({
    name: 'deleteSeller',
    initialState,
    reducers: {
        deleteSellerStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteSellerSuccess(state) {
            state.loading = false;
        },
        deleteSellerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    deleteSellerStart,
    deleteSellerSuccess,
    deleteSellerFailure,
} = deleteSellerSlice.actions;

export default deleteSellerSlice.reducer;