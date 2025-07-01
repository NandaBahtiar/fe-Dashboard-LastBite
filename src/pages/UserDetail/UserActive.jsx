import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox } from 'react-icons/fa';

const UserActive = () => {
    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Pengguna</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri - Profil Pengguna */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                                A
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">Ahmad</h2>
                            <p className="text-gray-600 flex items-center mt-1">
                                <FaEnvelope className="mr-2 text-gray-500" /> ahmad@example.com
                            </p>
                            <div className="flex space-x-2 mt-3">
                                <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Aktif</span>
                                <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Admin</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Detail</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <FaCalendarAlt className="mr-3 text-gray-500" />
                                    <span>20 Juni 2025</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 flex flex-col space-y-3">
                            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                                Nonaktifkan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan - Aktivitas Pengguna */}
                <div className="lg:col-span-2">
                    {/* Statistik Pengguna */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
                            <FaReceipt className="text-4xl text-blue-500 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700">Total Transaksi</h3>
                            <p className="text-2xl font-bold text-gray-800">150</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
                            <FaMoneyBillWave className="text-4xl text-green-500 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700">Total Nilai Transaksi</h3>
                            <p className="text-2xl font-bold text-gray-800">Rp 15.000.000</p>
                        </div>
                    </div>

                    {/* Riwayat Aktivitas */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Riwayat Aktivitas</h3>
                        <ul className="divide-y divide-gray-200">
                            <li className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">Login ke sistem</p>
                                    <p className="text-sm text-gray-500">30 Juni 2025, 10:00</p>
                                </div>
                                <span className="text-sm text-gray-600">IP: 192.168.1.1</span>
                            </li>
                            <li className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">Mengubah pengaturan profil</p>
                                    <p className="text-sm text-gray-500">29 Juni 2025, 14:30</p>
                                </div>
                                <span className="text-sm text-gray-600">IP: 192.168.1.1</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserActive;
