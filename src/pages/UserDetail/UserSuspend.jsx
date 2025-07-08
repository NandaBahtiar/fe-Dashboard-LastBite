import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox, FaUser, FaCheckCircle, FaTimes } from 'react-icons/fa';
import useUserDetail from '../../hooks/useUserDetail';

const UserSuspend = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [activationDate, setActivationDate] = useState('');
    const { updateUser } = useUserDetail();

    if (!user) {
        return <div>No user data available.</div>;
    }

    const handleActivateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const date =  new Date().toISOString()
    // console.log("date",date)
    const handleConfirmActivate = () => {
        updateUser({ id: user.id ,date:date});
        setShowModal(false);
        setActivationDate(''); // Reset date after action
    };
    // console.log("param",user)



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Pengguna</h1>
                        <div className="flex items-center space-x-2">
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                <FaTimes className="w-4 h-4 mr-1" />
                                Ditangguhkan
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kolom Kiri - Profil Pengguna */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
                                <div className="flex flex-col items-center text-white">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 ring-4 ring-white/30">
                                        {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <h2 className="text-xl font-semibold text-center">{user?.fullName || 'N/A'}</h2>
                                    <p className="text-yellow-100 text-sm mt-1">{user?.role || 'Pengguna'}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-600">
                                        <FaEnvelope className="w-4 h-4 mr-3 text-gray-400" />
                                        <span className="text-sm">{user?.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaPhone className="w-4 h-4 mr-3 text-gray-400" />
                                        <span className="text-sm">{user?.phoneNumber || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="w-4 h-4 mr-3 text-gray-400" />
                                        <span className="text-sm">
                                            Bergabung: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <button
                                onClick={handleActivateClick}
                                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-medium"
                            >
                                <FaCheckCircle className="w-4 h-4 mr-2" />
                                Aktifkan
                            </button>
                        </div>
                    </div>

                    {/* Kolom Kanan - Aktivitas Pengguna */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Alasan Penangguhan */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900">Alasan Penangguhan</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-700">{user?.suspendedReason || 'Tidak ada alasan yang diberikan.'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                            <h3 className="text-lg font-bold mb-4">Konfirmasi Aktifkan Pengguna</h3>
                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">Apakah Anda yakin ingin mengaktifkan pengguna ini?</p>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                                    onClick={handleCloseModal}
                                >
                                    Batal
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    onClick={handleConfirmActivate}
                                >
                                    Aktifkan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSuspend;