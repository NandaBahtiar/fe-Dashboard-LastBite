import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchCustomersStart,
    fetchCustomersSuccess,
    fetchCustomersFailure,
} from '../store/Slice/CustomerSlice';

const useCustomer = () => {
    const dispatch = useDispatch();

    const fetchCustomers = useCallback(async (params) => {
        dispatch(fetchCustomersStart());
        try {
            const response = await axiosInstance.get('/users', {
                params: {
                    role: 'ROLE_CUSTOMER',
                    page: params.page || 0,
                    size: params.size || 10,
                    sortField: params.sortField || 'createdAt',
                    sortDir: params.sortDir || 'desc',

                },
            });
            dispatch(fetchCustomersSuccess(response.data));
            // console.log("response",response.data)
        } catch (err) {
            dispatch(fetchCustomersFailure(err.message || 'Failed to fetch data'));
        }
    }, [dispatch]);

    return { fetchCustomers };
};

export default useCustomer;
