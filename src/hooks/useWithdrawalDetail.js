import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../services/axiosInstance';

const useWithdrawalDetail = (withdrawalId) => {
    const [withdrawalDetail, setWithdrawalDetail] = useState(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed' | 'updating'
    const [error, setError] = useState(null);

    const fetchDetail = useCallback(async () => {
        if (!withdrawalId) return;
        setStatus('loading');
        setError(null);
        try {
            const response = await axiosInstance.get(`/withdrawals/${withdrawalId}`);
            setWithdrawalDetail(response.data);
            setStatus('succeeded');
        } catch (err) {
            setError(err.response?.data || err.message);
            setStatus('failed');
        }
    }, [withdrawalId]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    // const updateWithdrawalStatus = useCallback(async (newStatus) => {
    //     setStatus('updating');
    //     setError(null);
    //     try {
    //         await axiosInstance.put(`/api/withdrawals/${withdrawalId}/status`, { status: newStatus });
    //         // Re-fetch detail to get the updated status
    //         await fetchDetail();
    //     } catch (err) {
    //         setError(err.response?.data || err.message);
    //         setStatus('failed'); // Set status to failed if update fails
    //     }
    // }, [withdrawalId, fetchDetail]);

    const approveWithdrawal = useCallback(async (proofOfPaymentUrl) => {
        setStatus('updating');
        setError(null);
        try {
            await axiosInstance.put(`/withdrawals/${withdrawalId}/approve`, { proofOfPaymentUrl });
            await fetchDetail();
        } catch (err) {
            setError(err.response?.data || err.message);
            setStatus('failed');
        }
    }, [withdrawalId, fetchDetail]);

    const rejectWithdrawal = useCallback(async () => {
        setStatus('updating');
        setError(null);
        try {
            await axiosInstance.put( `/withdrawals/${withdrawalId}/reject`);
            await fetchDetail();
        } catch (err) {
            setError(err.response?.data || err.message);
            setStatus('failed');
        }
    }, [withdrawalId, fetchDetail]);

    return { withdrawalDetail, status, error, approveWithdrawal, rejectWithdrawal, fetchDetail };
};

export default useWithdrawalDetail;
