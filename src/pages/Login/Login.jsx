import React, { useEffect, useState } from 'react';
// 1. Hapus impor yang salah dan impor useNavigate dari react-router-dom
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ingat, setIngat] = useState(false);
    const { login, error, user, checkAuthStatus, isAuthenticated } = useAuth();
    // 2. Inisialisasi hook useNavigate di dalam komponen
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password, ingat);
        } catch (err) {
            console.error("Login error caught in component:", err);
            // The error is already handled by useAuth, so no need to set error state here
        }
    };

    useEffect(() => {
        // Panggil fungsi untuk memeriksa status autentikasi.
        // Fungsi ini sebaiknya hanya perlu dipanggil sekali saat komponen dimuat.
        // checkAuthStatus(); // Removed as it's now handled in useAuth
    }, []); // <- Array kosong ini memastikan checkAuthStatus() hanya dipanggil 1x.

    useEffect(() => {
        // useEffect terpisah ini akan "mendengarkan" perubahan pada isAuthenticated.
        console.log("Authentication status changed:", isAuthenticated);
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        // Jika tidak terautentikasi, tidak melakukan apa-apa dan tetap di halaman saat ini.
    }, [isAuthenticated, navigate]); // <- Effect ini berjalan setiap kali nilai isAuthenticated atau navigate berubah.
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#2ECC71]">LastBite<span className="text-[#FF6B35]">.</span></h1>
                    <p className="mt-2 text-sm text-gray-600">Selamat datang kembali! Silakan masuk ke akun admin Anda.</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* ... sisa form Anda ... */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#2ECC71] focus:border-[#2ECC71] focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Kata Sandi</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#2ECC71] focus:border-[#2ECC71] focus:z-10 sm:text-sm"
                                placeholder="Kata Sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                // Perbaikan kecil untuk checkbox
                                   checked={ingat}
                                   onChange={(e) => setIngat(e.target.checked)}
                                   className="h-4 w-4 text-[#2ECC71] focus:ring-[#2ECC71] border-gray-300 rounded"/>
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Ingat saya
                            </label>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2ECC71] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ECC71]">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <i className="fas fa-lock h-5 w-5 text-green-300 group-hover:text-green-200"></i>
                            </span>
                            Masuk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;