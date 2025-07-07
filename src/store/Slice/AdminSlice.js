import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: null, // For single admin data
        adminUsers: [], // For list of admin users
        pagination: {
            page: 0,
            size: 8,
            totalElements: 0,
            totalPages: 0,
        },
        loading: false,
        error: null,
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    },
    reducers: {
        fetchAdminStart: (state) => {
            state.loading = true;
            state.error = null;
            state.status = 'loading';
        },
        fetchAdminSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = 'succeeded';
        },
        fetchAdminFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = 'failed';
        },
        fetchAdminUsersStart: (state) => {
            state.loading = true;
            state.error = null;
            state.status = 'loading';
        },
        fetchAdminUsersSuccess: (state, action) => {
            state.loading = false;
            state.adminUsers = action.payload.content;
            state.pagination = {
                page: action.payload.number,
                size: action.payload.size,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
            };
            state.status = 'succeeded';
        },
        fetchAdminUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = 'failed';
        },
    },
});

export const { fetchAdminStart, fetchAdminSuccess, fetchAdminFailure, fetchAdminUsersStart, fetchAdminUsersSuccess, fetchAdminUsersFailure } = adminSlice.actions;
export default adminSlice.reducer;
