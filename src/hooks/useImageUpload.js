import { useState, useCallback } from 'react';
import axiosInstance from '../services/axiosInstance';

const useImageUpload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const uploadImage = useCallback(async (file) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        if (!file) {
            setError('No file selected.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setData(response.data);
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to upload image.');
            throw err; // Re-throw to allow caller to handle
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { uploadImage, isLoading, error, data };
};

export default useImageUpload;
