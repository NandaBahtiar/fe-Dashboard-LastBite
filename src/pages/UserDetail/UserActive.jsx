import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox } from 'react-icons/fa';
import useUserDetail from '../../hooks/useUserDetail';

const UserActive = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [suspensionDate, setSuspensionDate] = useState('');
    const { updateUser } = useUserDetail();

    if (!user) {
        return <div>No user data available.</div>;
    }

    const handleDeactivateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmDeactivate = () => {
        if (suspensionDate) {
            const date = new Date(suspensionDate);
            date.setHours(23, 59, 59, 999); // Set to the end of the day
            const isoDateString = date.toISOString();
            updateUser({ id: user.id, date: isoDateString });
        } else {
            // Handle case where deactivation is permanent or has no end date
            updateUser({ id: user.id, date: null }); // Or a far-future date
        }
        setShowModal(false);
        setSuspensionDate(''); // Reset date after action
    };
    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Pengguna</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri - Profil Pengguna */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                                {user?.name ? user.fullName.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">{user?.fullName || 'N/A'}</h2>
                            <p className="text-gray-600 flex items-center mt-1">
                                <FaEnvelope className="mr-2 text-gray-500" /> {user?.email || 'N/A'}
                            </p>
                            <div className="flex space-x-2 mt-3">
                                <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{user?.status || 'N/A'}</span>
                                <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{user?.role || 'N/A'}</span>
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
                            <button
                                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                                onClick={handleDeactivateClick}
                            >
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
                            <FaReceipt className="text-4xl text-green-500 mb-3" />
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

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Konfirmasi Nonaktifkan Pengguna</h2>
                        <p className="text-gray-700 mb-6">Apakah Anda yakin ingin menonaktifkan pengguna ini? Tindakan ini tidak dapat dibatalkan.</p>
                        <div className="mb-4">
                            <label htmlFor="suspensionDate" className="block text-gray-700 text-sm font-bold mb-2">Tanggal Penangguhan (Opsional):</label>
                            <input
                                type="date"
                                id="suspensionDate"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={suspensionDate}
                                onChange={(e) => setSuspensionDate(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
                                onClick={handleCloseModal}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                onClick={handleConfirmDeactivate}
                            >
                                Nonaktifkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserActive;