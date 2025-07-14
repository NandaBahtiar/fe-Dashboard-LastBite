import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../services/axiosInstance';

const useWithdrawals = () => {
    
    const [withdrawals, setWithdrawals] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
    const [error, setError] = useState(null);

    const fetchWithdrawals = useCallback(async ({ page = 0, size = 8, search = '', status: filterStatus = 'PENDING' }) => {
        setStatus('loading');
        setError(null);
        
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('size', size);
            if (search) params.append('search', search);
            if (filterStatus) params.append('status', filterStatus);

            
            const response = await axiosInstance.get(`/withdrawals?${params.toString()}`);
            
            setWithdrawals(response.data.data);
            setPagination(response.data.paging);
            setStatus('succeeded');
        } catch (err) {
            console.error("Error fetching withdrawals:", err);
            setError(err.response?.data || err.message);
            setStatus('failed');
        }
    }, []);

    useEffect(() => {
        
        fetchWithdrawals({ page: 0, size: 8 }); // Initial fetch
    }, [fetchWithdrawals]);

    return { withdrawals, pagination, status, error, fetchWithdrawals };
};

export default useWithdrawals;