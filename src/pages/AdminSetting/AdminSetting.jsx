import React, { useState } from 'react';

const AdminSetting = () => {
    const [profile, setProfile] = useState({
        name: 'Admin Utama',
        email: 'admin@example.com',
        phone: '081234567890',
    });

    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const [notifications, setNotifications] = useState({
        newTransaction: true,
        newPartner: false,
    });

    const [appSettings, setAppSettings] = useState({
        appCommission: 5, // Default commission
        maintenanceMode: 'off',
    });

    const handleAppSettingsChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAppSettings(prevSettings => ({
            ...prevSettings,
            [name]: type === 'radio' ? value : (type === 'checkbox' ? checked : value),
        }));
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications({ ...notifications, [name]: checked });
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Pengaturan Admin</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informasi Profil */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Informasi Profil</h2>
                    <div className="flex items-center mb-6">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mr-6 cursor-pointer">
                            A
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-100 border-2"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-100 border-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-100 border-2"
                        />
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                        Simpan Perubahan
                    </button>
                </div>

                {/* Ubah Kata Sandi */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Ubah Kata Sandi</h2>
                    <div className="mb-4">
                        <label htmlFor="current" className="block text-sm font-medium text-gray-700">Kata Sandi Saat Ini</label>
                        <input
                            type="password"
                            name="current"
                            id="current"
                            value={password.current}
                            onChange={handlePasswordChange}
                            className="mt-1 block h-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-100 border-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new" className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
                        <input
                            type="password"
                            name="new"
                            id="new"
                            value={password.new}
                            onChange={handlePasswordChange}
                            className="mt-1 block h-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-100 border-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru</label>
                        <input
                            type="password"
                            name="confirm"
                            id="confirm"
                            value={password.confirm}
                            onChange={handlePasswordChange}
                            className="mt-1 block h-10 w-full border-gray-300 rounded-md shadow-sm border-gray-100 border-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                        Ubah Kata Sandi
                    </button>
                </div>

                {/* Pengaturan Umum Aplikasi */}
                <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Pengaturan Umum Aplikasi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="appCommission" className="block text-sm font-medium text-gray-700">Komisi Aplikasi (%)</label>
                            <input
                                type="number"
                                name="appCommission"
                                id="appCommission"
                                value={appSettings.appCommission}
                                onChange={handleAppSettingsChange}
                                className="mt-1 h-10 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-100 border-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mode Maintenance</label>
                            <div className="mt-2 flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="maintenanceMode"
                                        value="on"
                                        checked={appSettings.maintenanceMode === 'on'}
                                        onChange={handleAppSettingsChange}
                                        className="form-radio h-4 w-4 text-green-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">On</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="maintenanceMode"
                                        value="off"
                                        checked={appSettings.maintenanceMode === 'off'}
                                        onChange={handleAppSettingsChange}
                                        className="form-radio h-4 w-4 text-green-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Off</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300">
                            Simpan Pengaturan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSetting;