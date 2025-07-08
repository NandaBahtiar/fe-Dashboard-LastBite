import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchSalesSummaryStart,
    fetchSalesSummarySuccess,
    fetchSalesSummaryFailure,
} from '../store/Slice/SalesSummarySlice';

const useSalesSummary = () => {
    const dispatch = useDispatch();
    const { summary, loading, error } = useSelector((state) => state.salesSummary);

    const fetchSalesSummary = useCallback(async (params) => {
        dispatch(fetchSalesSummaryStart());
        try {
            const response = await axiosInstance.get('/orders/report', { // Changed API endpoint
                params: {
                    start: params.startDate || '',
                    end: params.endDate || '',
                    // Add other parameters as needed for your summary API
                },
            });
            dispatch(fetchSalesSummarySuccess(response.data));
        } catch (err) {
            dispatch(fetchSalesSummaryFailure(err.message || 'Failed to fetch sales summary'));
        }
    }, [dispatch]);

    return { summary, loading, error, fetchSalesSummary };
};

export default useSalesSummary;
