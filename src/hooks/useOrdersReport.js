import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchOrdersReportStart,
    fetchOrdersReportSuccess,
    fetchOrdersReportFailure,
} from '../store/Slice/OrdersReportSlice';

const useOrdersReport = () => {
    const dispatch = useDispatch();
    const { report, loading, error } = useSelector((state) => state.ordersReport);

    const fetchOrdersReport = useCallback(async (params) => {
        dispatch(fetchOrdersReportStart());
        try {
            const response = await axiosInstance.get('/orders/report', {
                params: {
                    startDate: params.startDate || '',
                    endDate: params.endDate || '',
                    // Add other parameters as needed for your report API
                },
            });
            dispatch(fetchOrdersReportSuccess(response.data));
        } catch (err) {
            dispatch(fetchOrdersReportFailure(err.message || 'Failed to fetch orders report'));
        }
    }, [dispatch]);

    return { report, loading, error, fetchOrdersReport };
};

export default useOrdersReport;
