import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchAdminStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAdminSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchAdminFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchAdminStart, fetchAdminSuccess, fetchAdminFailure } = adminSlice.actions;
export default adminSlice.reducer;
