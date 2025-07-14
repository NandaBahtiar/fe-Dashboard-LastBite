import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchCustomersStart,
    fetchCustomersSuccess,
    fetchCustomersFailure,
} from '../store/Slice/CustomerSlice';

const useUsers = () => {
    const dispatch = useDispatch();

    const fetchCustomers = useCallback(async (params) => {
        dispatch(fetchCustomersStart());
        try {
            const response = await axiosInstance.get('/users', {
                params: {
                    role: params.role || '',
                    page: params.page || 0,
                    size: params.size || 10,
                    sortField: params.sortField || 'createdAt',
                    sortDir: params.sortDir || 'desc',
                    search: params.search || '',
                    status: params.status || '',
                },
            });
            dispatch(fetchCustomersSuccess(response.data));
        } catch (err) {
            dispatch(fetchCustomersFailure(err.message || 'Failed to fetch data'));
        }
    }, [dispatch]);

    const updateUser = useCallback(async (userId, updatePayload) => {
        try {
            const response = await axiosInstance.put(`/users/${userId}`, updatePayload);
            // Optionally dispatch an action to update the user in the store
            // dispatch(updateUserSuccess(response.data));
            return response.data;
        } catch (err) {
            console.error("Failed to update user:", err);
            // Optionally dispatch an action for failure
            // dispatch(updateUserFailure(err.message));
            throw err;
        }
    }, []);

    return { fetchCustomers, updateUser };
};

export default useUsers;
