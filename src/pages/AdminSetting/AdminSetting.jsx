import React, { useCallback, useEffect, useState } from 'react';
import useAdmin from "../../hooks/useAdmin.js";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading.jsx";

// Validation schemas
const profileSchema = yup.object().shape({
    fullName: yup.string().required('Nama lengkap wajib diisi'),
    email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
    phoneNumber: yup.string()
        .matches(/^[0-9]+$/, 'Nomor telepon hanya boleh berisi angka')
        .min(10, 'Nomor telepon minimal 10 angka')
        .max(15, 'Nomor telepon maksimal 15 angka')
        .required('Nomor telepon wajib diisi'),
});

const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('Kata sandi saat ini wajib diisi'),
    newPassword: yup.string()
        .min(8, 'Kata sandi minimal 8 karakter')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka')
        .required('Kata sandi baru wajib diisi'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Konfirmasi kata sandi tidak cocok')
        .required('Konfirmasi kata sandi wajib diisi'),
});

const settingsSchema = yup.object().shape({
    appCommission: yup.number()
        .min(0, 'Komisi tidak boleh kurang dari 0')
        .max(100, 'Komisi tidak boleh lebih dari 100')
        .required('Komisi aplikasi wajib diisi'),
    maintenanceMode: yup.string().oneOf(['on', 'off']).required('Mode maintenance wajib dipilih'),
});

const AdminSetting = () => {
    const { data, loading, error } = useSelector((state) => state.admin);
    const { fetchAdminData, updateAdminProfile, changePassword, updateAppSettings } = useAdmin();

    // Loading states for different forms
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [ setSettingsLoading] = useState(false);

    // Profile form
    const profileForm = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: ''
        }
    });

    // Password form
    const passwordForm = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    // Settings form
    const settingsForm = useForm({
        resolver: yupResolver(settingsSchema),
        defaultValues: {
            appCommission: 0,
            maintenanceMode: 'off'
        }
    });

    const fetchData = useCallback(() => {
        fetchAdminData({
            page: 0,
            size: 1,
            sortField: 'createdAt',
            sortDir: 'desc',
            search: '',
            status: '',
        });
    }, [fetchAdminData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data && data.data) {
            const adminData = data.data;

            // Reset profile form with fetched data
            profileForm.reset({
                fullName: adminData.fullName || '',
                email: adminData.email || '',
                phoneNumber: adminData.phoneNumber || ''
            });

            // Reset settings form with fetched data
            settingsForm.reset({
                appCommission: adminData.appCommission || 0,
                maintenanceMode: adminData.maintenanceMode || 'off'
            });
        }
    }, [data, profileForm, settingsForm]);

    // Form submission handlers
    const onProfileSubmit = async (formData) => {
        setProfileLoading(true);
        try {
            await updateAdminProfile(formData);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Berhasil memperbarui profil.',
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || error.message || 'Gagal memperbarui profil. Silakan coba lagi.',
            });
        } finally {
            setProfileLoading(false);
        }
    };

    const onPasswordSubmit = async (formData) => {
        setPasswordLoading(true);
        const password = {
            oldPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmPassword
        };

        try {
            await changePassword(password);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Berhasil memperbarui kata sandi.',
            });
            passwordForm.reset();
        } catch (error) {
            console.error('Error changing password:', error.response?.data?.message || error.message);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || error.message || 'Gagal mengubah kata sandi. Silakan coba lagi.',
            });
        } finally {
            setPasswordLoading(false);
        }
    };

    // const onSettingsSubmit = async (formData) => {
    //     setSettingsLoading(true);
    //     try {
    //         await updateAppSettings(formData);
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Berhasil!',
    //             text: 'Pengaturan berhasil disimpan.',
    //         });
    //     } catch (error) {
    //         console.error('Error updating settings:', error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Gagal!',
    //             text: error.response?.data?.message || error.message || 'Gagal menyimpan pengaturan. Silakan coba lagi.',
    //         });
    //     } finally {
    //         setSettingsLoading(false);
    //     }
    // };

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error,
            });
        }
    }, [error]);

    if (loading) {
        return (
            <Loading/>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Pengaturan Admin</h1>
                    {/*<p className="text-gray-600">welcome to the seller management panel</p>*/}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informasi Profil */}
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center mb-6">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Informasi Profil</h2>
                    </div>

                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                        <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    {profileForm.watch('fullName') ? profileForm.watch('fullName').charAt(0).toUpperCase() : 'A'}
                                </div>
                            
                            </div>
                            <div className="flex-1">
                                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    {...profileForm.register("fullName")}
                                    autoComplete="name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-green-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                                    placeholder="Masukkan nama lengkap"
                                />
                                {profileForm.formState.errors.fullName && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {profileForm.formState.errors.fullName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...profileForm.register("email")}
                                autoComplete="email"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-green-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                                placeholder="contoh@email.com"
                            />
                            {profileForm.formState.errors.email && (
                                <p className="text-red-500 text-sm mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {profileForm.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Nomor Telepon
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                {...profileForm.register("phoneNumber")}
                                autoComplete="tel"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-green-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                                placeholder="08123456789"
                            />
                            {profileForm.formState.errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {profileForm.formState.errors.phoneNumber.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={profileLoading}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-200 focus:ring-offset-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        >
                            {profileLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Simpan Perubahan
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Ubah Kata Sandi */}
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center mb-6">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Ubah Kata Sandi</h2>
                    </div>

                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Kata Sandi Saat Ini
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                {...passwordForm.register("currentPassword")}
                                autoComplete="current-password"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                                placeholder="Masukkan kata sandi saat ini"
                            />
                            {passwordForm.formState.errors.currentPassword && (
                                <p className="text-red-500 text-sm mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {passwordForm.formState.errors.currentPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Kata Sandi Baru
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                {...passwordForm.register("newPassword")}
                                autoComplete="new-password"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                                placeholder="Masukkan kata sandi baru"
                            />
                            {passwordForm.formState.errors.newPassword && (
                                <p className="text-red-500 text-sm mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {passwordForm.formState.errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Konfirmasi Kata Sandi Baru
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...passwordForm.register("confirmPassword")}
                                autoComplete="new-password"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                                placeholder="Konfirmasi kata sandi baru"
                            />
                            {passwordForm.formState.errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {passwordForm.formState.errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        >
                            {passwordLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Mengubah...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Ubah Kata Sandi
                                </span>
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AdminSetting;