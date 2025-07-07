import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchAdminStart,
    fetchAdminSuccess,
    fetchAdminFailure,
} from '../store/Slice/AdminSlice';

const useAdmin = () => {
    const dispatch = useDispatch();

    const fetchAdminData = useCallback(async () => {
        dispatch(fetchAdminStart());
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axiosInstance.get('/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(fetchAdminSuccess(response.data));
        } catch (err) {
            dispatch(fetchAdminFailure(err.message || 'Failed to fetch admin data'));
        }
    }, [dispatch]);

    const updateAdminProfile = useCallback(async (profileData) => {
        dispatch(fetchAdminStart());
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axiosInstance.put('/users/me', profileData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.setItem("Acount",profileData.fullName)
            dispatch(fetchAdminSuccess(response.data));
            return response.data;
        } catch (err) {
            dispatch(fetchAdminFailure(err.message || 'Failed to update admin profile'));
            throw err;
        }
    }, [dispatch]);

    const changePassword = useCallback(async (passwordData) => {
        dispatch(fetchAdminStart());
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axiosInstance.put('/users/me/password', passwordData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(fetchAdminSuccess(response.data));
            return response.data;
        } catch (err) {
            dispatch(fetchAdminFailure(err.response?.data?.message || err.message || 'Failed to update admin password'));
            throw err;
        }
    }, [dispatch]);

    const createAdmin = useCallback(async (adminData) => {
        dispatch(fetchAdminStart()); // Menggunakan fetchAdminStart sebagai indikator loading
        try {
            const response = await axiosInstance.post('/auth/register-admin', adminData);
            // Anda mungkin ingin dispatch aksi sukses yang berbeda di sini
            // atau hanya mengembalikan data sukses
            dispatch(fetchAdminSuccess(response.data)); // Menggunakan fetchAdminSuccess sebagai indikator sukses
            return response.data;
        } catch (err) {
            dispatch(fetchAdminFailure(err.response?.data?.message || err.message || 'Failed to create admin'));
            throw err;
        }
    }, [dispatch]);

    return { fetchAdminData, updateAdminProfile, changePassword, createAdmin };
};

export default useAdmin;