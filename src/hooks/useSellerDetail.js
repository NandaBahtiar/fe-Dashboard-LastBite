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
            // console.log("sellerId", sellerId);
            const response = await axiosInstance.get(`/sellers/${sellerId}`);

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
        // console.log("id",id)
        // console.log("status",status)
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
    const fetchSellerMenu = useCallback(async ({ sellerId, page = 0, size = 10, name = '' }) => {
        dispatch(fetchSellerMenuStart());
        try {
            const nameParam = name ? `&name=${name}` : '';
            const response = await axiosInstance.get(`/menu-items?sortDir=asc&page=${page}&size=${size}&sellerId=${sellerId}${nameParam}`);
            const payload = {
                data: response.data.data,
                pagination: {
                    page: response.data.paging.currentPage,
                    size: response.data.paging.size,
                    totalElements: response.data.paging.totalElements,
                    totalPages: response.data.paging.totalPage
                }
            };
            dispatch(fetchSellerMenuSuccess(payload));
        } catch (err) {
            dispatch(fetchSellerMenuFailure(err.message || 'Failed to fetch seller menu'));
        }
    }, [dispatch]);
    
    const cenceledSeller = useCallback(async (sellerId) => {
        dispatch(canceledSellerStart());
        try {
            await axiosInstance.put(`/sellers/${sellerId}`, { "status": "CANCELLED" });
            // After canceling, re-fetch the seller detail to update the UI
            const response = await axiosInstance.get(`/sellers/${sellerId}`);
            dispatch(fetchSellerDetailSuccess(response.data.data)); // Update seller detail in Redux
            dispatch(canceledSellerSuccess());
        } catch (err) {
            dispatch(canceledSellerFailure(err.message || 'Failed to cancel seller'));
        }
    }, [dispatch]);

    const deleteMenuItem = useCallback(async (menuItemId) => {
        dispatch(deleteSellerStart()); // Reusing deleteSellerStart for general deletion indication
        try {
            await axiosInstance.delete(`/menu-items/${menuItemId}`);
            dispatch(deleteSellerSuccess()); // Reusing deleteSellerSuccess
        } catch (err) {
            dispatch(deleteSellerFailure(err.message || 'Failed to delete menu item')); // Reusing deleteSellerFailure
            throw err; // Re-throw to allow component to handle
        }
    }, [dispatch]);

    return { fetchSellerDetail, resetSellerDetail, updateSeller, fetchSellerMenu, cenceledSeller, deleteMenuItem };
};

export default useSellerDetail;