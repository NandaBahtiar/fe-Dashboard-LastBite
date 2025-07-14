import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../services/axiosInstance';
import {
    fetchCustomerOrdersStart,
    fetchCustomerOrdersSuccess,
    fetchCustomerOrdersFailure,
    clearCustomerOrders,
} from '../store/Slice/CustomerOrdersSlice';

const useCustomerOrders = () => {
    const dispatch = useDispatch();
    const { orders, pagination, loading, error } = useSelector((state) => state.orderDetail); // Menggunakan orderDetail karena itu nama di store

    const fetchCustomerOrders = useCallback(async (customerId, page = 0, size = 5, status = '') => {
        dispatch(fetchCustomerOrdersStart());
        try {
            const response = await axiosInstance.get(`/orders`, { params: { customerId, page, size, status } });
            const payload = {
                data: response.data.data,
                paging: {
                    page: response.data.paging.currentPage,
                    size: response.data.paging.size,
                    totalElements: response.data.paging.totalElements,
                    totalPages: response.data.paging.totalPage
                }
            };
            console.log("respon", response)
            dispatch(fetchCustomerOrdersSuccess(payload));
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch customer orders';
            dispatch(fetchCustomerOrdersFailure(errorMessage));
        }
    }, [dispatch]);

    const resetCustomerOrders = useCallback(() => {
        dispatch(clearCustomerOrders());
    }, [dispatch]);

    return {
        orders,
        pagination,
        loading,
        error,
        fetchCustomerOrders,
        resetCustomerOrders,
    };
};

export default useCustomerOrders;
