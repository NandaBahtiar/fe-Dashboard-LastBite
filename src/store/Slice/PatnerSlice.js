import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  partners: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    // Reducers can be added here
  },
  extraReducers: (builder) => {
    // For handling async thunks
  },
});

export const { } = partnerSlice.actions;

export default partnerSlice.reducer;
