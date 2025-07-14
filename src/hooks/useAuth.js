import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const useAuth = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                await checkAuthStatus();
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (username, password, ingat) => {
        setLoading(true);
        setError('');
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });

            const { token, fullName: responseUsername, refreshToken, roles } = response.data.data;

            if (!token) {
                setError('Login successful, but no token received from the server.');
                setLoading(false);
                return;
            }

            if (ingat) {
                localStorage.setItem('refresh', refreshToken);
            }

            if (roles.includes('ROLE_SUPER_ADMIN')) {
                localStorage.setItem('role', "ROLE_SUPER_ADMIN");
            } else {
                localStorage.setItem('role', "ROLE_ADMIN");
            }
            localStorage.setItem('Acount', responseUsername);
            localStorage.setItem('jwtToken', token);

            setIsAuthenticated(true);
            if (navigate) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Login error in useAuth:", err);
            if (err.response && err.response.status === 401) {
                setError('Username atau password salah.');
            } else if (err.response && err.response.data && err.response.data.message) {
                setError("username atau password salah",err.response.data.message);
            } else {
                setError('Login failed. Please try again.');
            }
            setIsAuthenticated(false); // Ensure isAuthenticated is false on error
        } finally {
            setLoading(false);
        }
    };
    const checkAuthStatus = async () => {
        try {
            const response = await axiosInstance.get('/users/me');
            setIsAuthenticated(true);
            setUser(response.data);
        } catch (err) {
            console.log("checkAuthStatus: API call failed. Setting isAuthenticated to false.");
            setIsAuthenticated(false);
            setUser(null);
            console.log("checkAuthStatus: Current isAuthenticated state after failure:", isAuthenticated);
            console.log("checkAuthStatus: Token in localStorage before removal:", localStorage.getItem('jwtToken'));
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('Acount');
            localStorage.removeItem('role');
            // localStorage.removeItem('refresh');
        }
    };
    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('Acount');
        localStorage.removeItem('role');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
        navigate('/');
    };

    return { login, logout, error, isAuthenticated, loading,checkAuthStatus };
};

export default useAuth;
