import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchReviewsByMenuItem = createAsyncThunk(
    'reviews/fetchByMenuItem',
    async (menuItemId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/menu-item-reviews/menu/${menuItemId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/menu-item-reviews/${reviewId}`);
            return reviewId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByMenuItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewsByMenuItem.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviewsByMenuItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.data = state.reviews.data.filter(review => review.id !== action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reviewSlice.reducer;
