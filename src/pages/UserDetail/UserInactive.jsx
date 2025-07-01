import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox } from 'react-icons/fa';

const UserInactive = () => {
    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Pengguna</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri - Profil Pengguna */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                                B
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">Budi</h2>
                            <p className="text-gray-600 flex items-center mt-1">
                                <FaEnvelope className="mr-2 text-gray-500" /> budi@example.com
                            </p>
                            <div className="flex space-x-2 mt-3">
                                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Tidak Aktif</span>
                                <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">User</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Detail</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <FaCalendarAlt className="mr-3 text-gray-500" />
                                    <span>22 Juni 2025</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 flex flex-col space-y-3">
                            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                                Aktifkan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan - Aktivitas Pengguna */}
                <div className="lg:col-span-2">
                    {/* Statistik Pengguna */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 opacity-50">
                        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
                            <FaReceipt className="text-4xl text-green-500 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700">Total Transaksi</h3>
                            <p className="text-2xl font-bold text-gray-800">0</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center">
                            <FaMoneyBillWave className="text-4xl text-green-500 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700">Total Nilai Transaksi</h3>
                            <p className="text-2xl font-bold text-gray-800">Rp 0</p>
                        </div>
                    </div>

                    {/* Riwayat Aktivitas */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-300 text-gray-500">
                            <FaBox className="text-6xl mb-4" />
                            <p className="text-lg">Tidak ada aktivitas yang tercatat untuk pengguna ini</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInactive;