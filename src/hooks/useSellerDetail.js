import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchSellerDetailStart,
    fetchSellerDetailSuccess,
    fetchSellerDetailFailure,
    clearSellerDetail,
} from '../store/Slice/SellerDetailSlice';

const useSellerDetail = () => {
    const dispatch = useDispatch();

    const fetchSellerDetail = useCallback(async (sellerId) => {
        dispatch(fetchSellerDetailStart());
        try {
            const response = await axiosInstance.get(`/sellers/${sellerId.id}`);
            dispatch(fetchSellerDetailSuccess(response.data.data));
        } catch (err) {
            dispatch(fetchSellerDetailFailure(err.message || 'Failed to fetch seller detail'));
        }
    }, [dispatch]);

    const resetSellerDetail = useCallback(() => {
        dispatch(clearSellerDetail());
    }, [dispatch]);

    const updateSeller = useCallback(async ({ id, status }) => {
        dispatch(fetchSellerDetailStart());
        console.log("id",id)
        console.log("status",status)
        try {
            if (status){

                await axiosInstance.put(`/sellers/${id}`, { "status": "ACTIVE" });
            }else{
                await axiosInstance.put(`/sellers/${id}`, { "status": "INACTIVE" });
            }
            // Fetch the seller detail again to get the updated data
            const response = await axiosInstance.get(`/sellers/${id}`);
            dispatch(fetchSellerDetailSuccess(response.data.data));
        } catch (err) {
            dispatch(fetchSellerDetailFailure(err.message || 'Failed to update seller'));
        }
    }, [dispatch]);

    return { fetchSellerDetail, resetSellerDetail, updateSeller };
};

export default useSellerDetail;