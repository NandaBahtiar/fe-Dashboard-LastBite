import React, { useCallback, useEffect, useState } from 'react';
import useAdmin from "../../hooks/useAdmin.js";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from "sweetalert2";

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
    const [settingsLoading, setSettingsLoading] = useState(false);

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

    const onSettingsSubmit = async (formData) => {
        setSettingsLoading(true);
        try {
            await updateAppSettings(formData);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Pengaturan berhasil disimpan.',
            });
        } catch (error) {
            console.error('Error updating settings:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || error.message || 'Gagal menyimpan pengaturan. Silakan coba lagi.',
            });
        } finally {
            setSettingsLoading(false);
        }
    };

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
            <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-gray-600">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Pengaturan Admin</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informasi Profil */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Informasi Profil</h2>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                        <div className="flex items-center mb-6">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mr-6">
                                {profileForm.watch('fullName') ? profileForm.watch('fullName').charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nama</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    {...profileForm.register("fullName")}
                                    className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-2"
                                />
                                {profileForm.formState.errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">{profileForm.formState.errors.fullName.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...profileForm.register("email")}
                                className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-2"
                            />
                            {profileForm.formState.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{profileForm.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                {...profileForm.register("phoneNumber")}
                                className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-2"
                            />
                            {profileForm.formState.errors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">{profileForm.formState.errors.phoneNumber.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={profileLoading}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {profileLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </form>
                </div>

                {/* Ubah Kata Sandi */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Ubah Kata Sandi</h2>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Kata Sandi Saat Ini</label>
                            <input
                                type="password"
                                id="currentPassword"
                                {...passwordForm.register("currentPassword")}
                                className="mt-1 block h-10 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-2"
                            />
                            {passwordForm.formState.errors.currentPassword && (
                                <p className="text-red-500 text-xs mt-1">{passwordForm.formState.errors.currentPassword.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
                            <input
                                type="password"
                                id="newPassword"
                                {...passwordForm.register("newPassword")}
                                className="mt-1 block h-10 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-2"
                            />
                            {passwordForm.formState.errors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">{passwordForm.formState.errors.newPassword.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...passwordForm.register("confirmPassword")}
                                className="mt-1 block h-10 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-2"
                            />
                            {passwordForm.formState.errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{passwordForm.formState.errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {passwordLoading ? 'Mengubah...' : 'Ubah Kata Sandi'}
                        </button>
                    </form>
                </div>

                {/* Pengaturan Umum Aplikasi */}
                {/*<div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">*/}
                {/*    <h2 className="text-xl font-semibold mb-4">Pengaturan Umum Aplikasi</h2>*/}
                {/*    <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)}>*/}
                {/*        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">*/}
                {/*            <div>*/}
                {/*                <label htmlFor="appCommission" className="block text-sm font-medium text-gray-700">Komisi Aplikasi (%)</label>*/}
                {/*                <input*/}
                {/*                    type="number"*/}
                {/*                    id="appCommission"*/}
                {/*                    step="0.01"*/}
                {/*                    min="0"*/}
                {/*                    max="100"*/}
                {/*                    {...settingsForm.register("appCommission")}*/}
                {/*                    className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-2"*/}
                {/*                />*/}
                {/*                {settingsForm.formState.errors.appCommission && (*/}
                {/*                    <p className="text-red-500 text-xs mt-1">{settingsForm.formState.errors.appCommission.message}</p>*/}
                {/*                )}*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <label className="block text-sm font-medium text-gray-700">Mode Maintenance</label>*/}
                {/*                <div className="mt-2 flex items-center space-x-4">*/}
                {/*                    <label className="inline-flex items-center">*/}
                {/*                        <input*/}
                {/*                            type="radio"*/}
                {/*                            value="on"*/}
                {/*                            {...settingsForm.register("maintenanceMode")}*/}
                {/*                            className="form-radio h-4 w-4 text-green-600"*/}
                {/*                        />*/}
                {/*                        <span className="ml-2 text-sm text-gray-700">On</span>*/}
                {/*                    </label>*/}
                {/*                    <label className="inline-flex items-center">*/}
                {/*                        <input*/}
                {/*                            type="radio"*/}
                {/*                            value="off"*/}
                {/*                            {...settingsForm.register("maintenanceMode")}*/}
                {/*                            className="form-radio h-4 w-4 text-green-600"*/}
                {/*                        />*/}
                {/*                        <span className="ml-2 text-sm text-gray-700">Off</span>*/}
                {/*                    </label>*/}
                {/*                </div>*/}
                {/*                {settingsForm.formState.errors.maintenanceMode && (*/}
                {/*                    <p className="text-red-500 text-xs mt-1">{settingsForm.formState.errors.maintenanceMode.message}</p>*/}
                {/*                )}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="mt-6 text-right">*/}
                {/*            <button*/}
                {/*                type="submit"*/}
                {/*                disabled={settingsLoading}*/}
                {/*                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"*/}
                {/*            >*/}
                {/*                {settingsLoading ? 'Menyimpan...' : 'Simpan Pengaturan'}*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </form>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default AdminSetting;