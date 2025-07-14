import { useState, useCallback } from 'react';
import axiosInstance from '../services/axiosInstance';

const useMenuItem = () => {
    const [menuItem, setMenuItem] = useState(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed' | 'updating'
    const [error, setError] = useState(null);

    const fetchMenuItem = useCallback(async (id) => {
        setStatus('loading');
        setError(null);
        try {
            const response = await axiosInstance.get(`/menu-items/${id}`);
            setMenuItem(response.data.data);
            setStatus('succeeded');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setStatus('failed');
        }
    }, []);

    const updateMenuItem = useCallback(async (id, updatedData) => {
        setStatus('updating');
        setError(null);
        try {
            const response = await axiosInstance.put(`/menu-items/${id}`, updatedData);
            setMenuItem(response.data.data);
            setStatus('succeeded');
            return response.data.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setStatus('failed');
            throw err; // Re-throw to allow caller to handle
        }
    }, []);

    const deleteMenuItem = useCallback(async (id,isdelete) => {
        setStatus('updating');
        setError(null);
        try {
            await axiosInstance.put(`/menu-items/${id}`, { isDeleted: isdelete });
            setMenuItem(null); // Clear menu item after deletion
            setStatus('succeeded');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setStatus('failed');
            throw err; // Re-throw to allow caller to handle
        }
    }, []);

    return { menuItem, status, error, fetchMenuItem, updateMenuItem, deleteMenuItem };
};

export default useMenuItem;
