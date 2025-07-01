import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statistics: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const statisticSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    // Reducers can be added here
  },
  extraReducers: (builder) => {
    // For handling async thunks
  },
});

export const { } = statisticSlice.actions;

export default statisticSlice.reducer;
