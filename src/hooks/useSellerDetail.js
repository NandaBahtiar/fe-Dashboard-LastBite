import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchSellerDetailStart,
    fetchSellerDetailSuccess,
    fetchSellerDetailFailure,
    clearSellerDetail,
} from '../store/Slice/SellerDetailSlice';
import {
    fetchSellerMenuStart,
    fetchSellerMenuSuccess,
    fetchSellerMenuFailure,
} from '../store/Slice/SellerMenuSlice';
import {
    canceledSellerStart,
    canceledSellerSuccess,
    canceledSellerFailure,
} from '../store/Slice/CanceledSellerSlice';
import {
    deleteSellerStart,
    deleteSellerSuccess,
    deleteSellerFailure,
} from '../store/Slice/DeleteSellerSlice';

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
    const fetchSellerMenu = useCallback(async (sellerId) => {
        dispatch(fetchSellerMenuStart());
        try {
            const response = await axiosInstance.get(`/menu-items?sortDir=asc&page=0&size=10&sellerId=${sellerId}`);
            dispatch(fetchSellerMenuSuccess(response.data.data));
        } catch (err) {
            dispatch(fetchSellerMenuFailure(err.message || 'Failed to fetch seller menu'));
        }
    }, [dispatch]);
    
    const cenceledSeller = useCallback(async (sellerId) => {
        dispatch(canceledSellerStart());
        try {
            await axiosInstance.put(`/sellers/${sellerId}`, { "status": "CANCELLED" });
            dispatch(canceledSellerSuccess());
        } catch (err) {
            dispatch(canceledSellerFailure(err.message || 'Failed to cancel seller'));
        }
    }, [dispatch]);

    const deleteSeller = useCallback(async (sellerId) => {
        dispatch(deleteSellerStart());
        try {
            await axiosInstance.delete(`/sellers/${sellerId}`);
            dispatch(deleteSellerSuccess());
        } catch (err) {
            dispatch(deleteSellerFailure(err.message || 'Failed to delete seller'));
        }
    }, [dispatch]);
    
    return { fetchSellerDetail, resetSellerDetail, updateSeller, fetchSellerMenu, cenceledSeller, deleteSeller };
};

export default useSellerDetail;