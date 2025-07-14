import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByMenuItem, deleteReview } from '../store/Slice/ReviewSlice';
import { useCallback } from 'react';

const useReviews = () => {
    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector((state) => state.reviews);

    const getReviewsByMenuItem = useCallback((menuItemId) => {
        dispatch(fetchReviewsByMenuItem(menuItemId));
    }, [dispatch]);

    const removeReview = useCallback(async (reviewId) => {
        await dispatch(deleteReview(reviewId));
    }, [dispatch]);

    return { reviews, loading, error, getReviewsByMenuItem, deleteReview: removeReview };
};

export default useReviews;
