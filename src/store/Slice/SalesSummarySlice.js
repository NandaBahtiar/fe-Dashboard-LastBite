import { createSlice } from '@reduxjs/toolkit';

const salesSummarySlice = createSlice({
    name: 'salesSummary',
    initialState: {
        summary: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchSalesSummaryStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSalesSummarySuccess: (state, action) => {
            state.loading = false;
            state.summary = action.payload;
        },
        fetchSalesSummaryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSalesSummaryStart,
    fetchSalesSummarySuccess,
    fetchSalesSummaryFailure,
} = salesSummarySlice.actions;

export default salesSummarySlice.reducer;
