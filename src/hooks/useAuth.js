import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axiosInstance';

const useAuth = () => {
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    useEffect(() => {
        const token = 1;
        if (token == null){
            navigate('/dashboard');
        }
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const login = async (username, password,ingat) => {
        setError('');
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });

            const { token, fullName: responseUsername ,refreshToken,roles} = response.data.data;
            if (ingat){

                localStorage.setItem('refresh', refreshToken);
            }
            if (!token) {
                setError('Login successful, but no token received from the server.');
                return;
            }
            localStorage.setItem('role', roles[0])
            localStorage.setItem('Acount', responseUsername);
            localStorage.setItem('jwtToken', token);

            setIsAuthenticated(true);
            // dispatch(setLogin({ user:{}, token }));
            navigate('/dashboard');
        }
             catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        // dispatch(setLogout());
        navigate('/');
    };

    return { login, logout, error, isAuthenticated, loading };
};

export default useAuth;