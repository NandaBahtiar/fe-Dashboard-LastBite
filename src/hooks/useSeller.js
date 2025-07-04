import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchPatnersStart,
    fetchPatnersSuccess,
    fetchPatnersFailure,
} from '../store/Slice/PatnerSlice';

const useSeller = () => {
    const dispatch = useDispatch();

    const fetchPatners = useCallback(async (params) => {
        dispatch(fetchPatnersStart());
        try {
            const response = await axiosInstance.get('/sellers', {
                params: {
                    storeName: params.search || '',
                    status: params.status || '',
                    page: params.page || 0,
                    size: params.size || 10,
                    sortField: params.sortField || 'storeName',
                    sortDir: params.sortDir || 'asc',
                    // storeName: params.search || '',

                },
            });
            dispatch(fetchPatnersSuccess(response.data));
        } catch (err) {
            dispatch(fetchPatnersFailure(err.message || 'Failed to fetch data'));
        }
    }, [dispatch]);

    return { fetchPatners };
};

export default useSeller;
