import React, { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import Swal from 'sweetalert2';

const CreateAdmin = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    const { createAdmin } = useAdmin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminData = { username, fullName, email, password, phoneNumber, profileImageUrl };
        try {
            await createAdmin(adminData);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Admin baru berhasil didaftarkan.',
                showConfirmButton: false,
                timer: 1500
            });
            setUsername('');
            setFullName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setProfileImageUrl('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.message || 'Terjadi kesalahan saat mendaftarkan admin.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br   py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Daftar Admin Baru</h1>
                    <p className="text-gray-600">Tambahkan admin baru ke dalam sistem</p>
                </div>

                {/* Form Card */}
                <div className="bg-white backdrop-blur-sm bg-opacity-90 rounded-3xl shadow-2xl p-8 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="group">
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    placeholder="Masukkan username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Full Name Field */}
                        <div className="group">
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    placeholder="Masukkan nama lengkap"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    placeholder="Masukkan kata sandi"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Phone Number Field */}
                        <div className="group">
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                                Nomor Telepon
                            </label>
                            <div className="relative">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    placeholder="08xxxxxxxxxx"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/*<div className="group">*/}
                        {/*    <label htmlFor="profileImageUrl" className="block text-sm font-semibold text-gray-700 mb-2">*/}
                        {/*        URL Gambar Profil (opsional)*/}
                        {/*    </label>*/}
                        {/*    <div className="relative">*/}
                        {/*        <input*/}
                        {/*            id="profileImageUrl"*/}
                        {/*            name="profileImageUrl"*/}
                        {/*            type="url"*/}
                        {/*            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-gray-700 placeholder-gray-400"*/}
                        {/*            placeholder="https://example.com/profile.jpg"*/}
                        {/*            value={profileImageUrl}*/}
                        {/*            onChange={(e) => setProfileImageUrl(e.target.value)}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Daftar Admin
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Pastikan semua data yang dimasukkan sudah benar sebelum mendaftar admin baru
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAdmin;