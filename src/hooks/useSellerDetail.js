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
            
            const response = await axiosInstance.get(`/sellers/${sellerId}`);

            dispatch(fetchSellerDetailSuccess(response.data.data));
        } catch (err) {
            dispatch(fetchSellerDetailFailure(err.message || 'Failed to fetch seller detail'));
        }
    }, [dispatch]);

    const resetSellerDetail = useCallback(() => {
        dispatch(clearSellerDetail());
    }, [dispatch]);

    const updateSeller = useCallback(async ({ id, suspendedUntil, suspendedReason }) => {
        dispatch(fetchSellerDetailStart());
        try {
            await axiosInstance.put(`/sellers/${id}`, { suspendedUntil, suspendedReason });
            const response = await axiosInstance.get(`/sellers/${id}`);
            dispatch(fetchSellerDetailSuccess(response.data.data));
        } catch (err) {
            dispatch(fetchSellerDetailFailure(err.message || 'Failed to update seller'));
        }
    }, [dispatch]);

    const approveOrRejectSeller = useCallback(async ({ id, isVerified, cancelReason }) => {
        dispatch(fetchSellerDetailStart());
        try {
            const payload = {
                status: isVerified ? 'ACTIVE' : 'CANCELLED',
                cancelReason: cancelReason,
            };
            await axiosInstance.put(`/sellers/${id}`, payload);
            const response = await axiosInstance.get(`/sellers/${id}`);
            dispatch(fetchSellerDetailSuccess(response.data.data));
        } catch (err) {
            dispatch(fetchSellerDetailFailure(err.message || 'Failed to update seller verification status'));
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

    return { fetchSellerDetail, resetSellerDetail, updateSeller, fetchSellerMenu, cenceledSeller, deleteMenuItem, approveOrRejectSeller };
};

export default useSellerDetail;