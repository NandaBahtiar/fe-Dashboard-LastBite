import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://10.10.102.131:8080/api', // Sesuaikan dengan base URL API Anda
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor untuk menambahkan token JWT
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;