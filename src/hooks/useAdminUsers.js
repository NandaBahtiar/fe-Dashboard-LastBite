import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import { fetchAdminUsersStart, fetchAdminUsersSuccess, fetchAdminUsersFailure } from '../store/Slice/AdminSlice';

const useAdminUsers = () => {
    const dispatch = useDispatch();
    const { adminUsers, pagination, status, error } = useSelector((state) => state.admin);

    const fetchAdminUsers = useCallback(async (page = 0, size = 8, searchTerm = '', statusFilter = '') => {
        dispatch(fetchAdminUsersStart());
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axiosInstance.get('/users', {
                params: { page, size, search: searchTerm, role: 'ROLE_ADMIN', status: statusFilter },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(fetchAdminUsersSuccess(response.data.data));
        } catch (err) {
            dispatch(fetchAdminUsersFailure(err.message || 'Failed to fetch admin users'));
        }
    }, [dispatch]);

    return { fetchAdminUsers, adminUsers, pagination, status, error };
};

export default useAdminUsers;