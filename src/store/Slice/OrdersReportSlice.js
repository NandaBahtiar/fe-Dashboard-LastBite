import { createSlice } from '@reduxjs/toolkit';

const ordersReportSlice = createSlice({
    name: 'ordersReport',
    initialState: {
        report: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchOrdersReportStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersReportSuccess: (state, action) => {
            state.loading = false;
            state.report = action.payload;
        },
        fetchOrdersReportFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchOrdersReportStart,
    fetchOrdersReportSuccess,
    fetchOrdersReportFailure,
} = ordersReportSlice.actions;

export default ordersReportSlice.reducer;
