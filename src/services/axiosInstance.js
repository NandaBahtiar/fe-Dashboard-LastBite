import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://10.10.102.131:8080/api', // Sesuaikan dengan base URL API Anda
    headers: {

        'Content-Type': 'application/json',
        // 'ngrok-skip-browser-warning': 'true'

    },
});
const refresh = localStorage.getItem("refresh");

// Flag untuk menandakan apakah proses refresh token sedang berjalan
let isRefreshing = false;
// Antrian permintaan yang gagal saat refresh token sedang berlangsung
let failedQueue = [];

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

// Response interceptor untuk menangani token yang tidak valid
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        // Jika error adalah 401 (Unauthorized) dan ada refresh token, serta permintaan belum dicoba ulang
        if (error.response && error.response.status === 401 && refresh && !originalRequest._retry) {
            // Jika proses refresh token sedang berjalan, tambahkan permintaan ke antrian
            if (isRefreshing) {
                return new Promise((resolve) => {
                    failedQueue.push((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true; // Tandai permintaan ini sudah dicoba ulang
            isRefreshing = true; // Set flag bahwa refresh token sedang berjalan

            return new Promise((resolve, reject) => {
                
                // Kirim permintaan untuk mendapatkan refresh token baru
                axios.post('http://10.10.102.131:8080/api/auth/refresh-token', {
                    refreshToken: refresh
                })
                    .then((response) => {
                        const { token, refreshToken } = response.data;
                        // Simpan token baru di localStorage
                        localStorage.setItem('jwtToken', token);
                        localStorage.setItem('refresh', refreshToken);
                        // Perbarui header Authorization default untuk axiosInstance
                        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
                        // Ulangi semua permintaan yang ada di antrian dengan token baru
                        failedQueue.forEach((callback) => callback(token));
                        failedQueue = []; // Kosongkan antrian
                        // Ulangi permintaan asli yang memicu refresh
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosInstance(originalRequest));
                    })
                    .catch((err) => {
                        // Jika refresh token gagal, hapus semua data di localStorage dan arahkan ke halaman login
                        localStorage.clear();
                        window.location.href = '/';
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false; // Set flag kembali ke false setelah proses selesai
                    });
            });
        } else if (error.response && error.response.status === 401) {
             const errorMessage = error.response?.data?.message;
            
            if (errorMessage === "Akun anda di suspend dengan alasan kamu tidak kerja degan baik") {

            } else {
                localStorage.clear();
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
