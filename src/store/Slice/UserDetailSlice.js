import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetail: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {
        fetchUserDetailStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchUserDetailSuccess(state, action) {
            state.status = 'succeeded';
            state.userDetail = action.payload;
        },
        fetchUserDetailFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        clearUserDetail(state) {
            state.userDetail = null;
            state.status = 'idle';
            state.error = null;
        },
    },
});

export const {
    fetchUserDetailStart,
    fetchUserDetailSuccess,
    fetchUserDetailFailure,
    clearUserDetail,
} = userDetailSlice.actions;

export default userDetailSlice.reducer;
