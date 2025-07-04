import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchUserDetailStart,
    fetchUserDetailSuccess,
    fetchUserDetailFailure,
    clearUserDetail,
} from '../store/Slice/UserDetailSlice';

const useUserDetail = () => {
    const dispatch = useDispatch();

    const fetchUserDetail = useCallback(async (userId) => {
        dispatch(fetchUserDetailStart());
        console.log("id",userId)
        try {
            const response = await axiosInstance.get(`/users/${userId.id}`);
            dispatch(fetchUserDetailSuccess(response.data.data));
            // console.log("data",response.data.data)
        } catch (err) {
            dispatch(fetchUserDetailFailure(err.message || 'Failed to fetch user detail'));
        }
    }, [dispatch]);

    const resetUserDetail = useCallback(() => {
        dispatch(clearUserDetail());
    }, [dispatch]);

    const updateUser = useCallback(async ({ id, date }) => {
        dispatch(fetchUserDetailStart());
        try {
            await axiosInstance.put(`/users/${id}`, { "suspendedUntil": date });
            // Fetch the user detail again to get the updated data
            const response = await axiosInstance.get(`/users/${id}`);
            dispatch(fetchUserDetailSuccess(response.data.data));

        } catch (err) {
            dispatch(fetchUserDetailFailure(err.message || 'Failed to update user'));
        }
    }, [dispatch]);

    return { fetchUserDetail, resetUserDetail, updateUser };
};

export default useUserDetail;