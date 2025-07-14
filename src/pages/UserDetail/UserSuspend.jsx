import React, { useState } from 'react';
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone,
    FaCalendarAlt,
    FaFilePdf,
    FaReceipt,
    FaMoneyBillWave,
    FaStar,
    FaBox,
    FaUser,
    FaCheckCircle,
    FaTimes,
    FaExclamationTriangle,
    FaInfoCircle
} from 'react-icons/fa';
import useUserDetail from '../../hooks/useUserDetail';

const UserSuspend = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [activationDate, setActivationDate] = useState('');
    const { updateUser } = useUserDetail();

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <FaExclamationTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No user data available.</p>
                </div>
            </div>
        );
    }

    const handleActivateClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const dateNow = new Date();

    const handleConfirmActivate = () => {
        updateUser({ id: user.id, date: dateNow });
        setShowModal(false);
        setActivationDate(''); // Reset date after action
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Detail Pengguna</h1>
                        <span className="text-sm font-medium px-4 py-2 rounded-full flex items-center bg-red-100 text-red-800">
                            <FaTimes className="w-4 h-4 mr-2" />
                            Ditangguhkan
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Status Section */}
                    <div className="bg-red-50 border-red-100 border-b p-8 text-center">
                        <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Pengguna Ditangguhkan
                        </h2>
                        <p className="text-gray-600">
                            Akun pengguna <span className="font-semibold text-gray-900">{user.fullName}</span>
                            telah ditangguhkan.
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Suspension Information */}
                            <div className="space-y-6">
                                {/* Suspension Reason */}
                                <div className="bg-red-50 border-red-100 rounded-lg p-6 border">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Alasan Penangguhan</h3>
                                    <div className="flex items-start">
                                        <FaTimes className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-900 mb-1">
                                                Status Ditangguhkan
                                            </p>
                                            <p className="text-gray-700 text-sm">
                                                {user?.suspendedReason || 'Tidak ada alasan yang diberikan.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Information */}
                                <div className="bg-yellow-50 border-yellow-100 rounded-lg p-6 border">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Akun</h3>
                                    <div className="flex items-start">
                                        <FaExclamationTriangle className="w-5 h-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-900 mb-1">
                                                Menunggu Aktivasi
                                            </p>
                                            <p className="text-gray-700 text-sm">
                                                Akun pengguna ini dapat diaktifkan kembali oleh admin.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - User Information */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Informasi Pengguna</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <FaUser className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Nama Lengkap</p>
                                                <p className="text-gray-700">{user?.fullName || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaEnvelope className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Email</p>
                                                <p className="text-gray-700">{user?.email || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaPhone className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Nomor Telepon</p>
                                                <p className="text-gray-700">{user?.phoneNumber || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Alamat</p>
                                                <p className="text-gray-700">{user?.address || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Role</p>
                                                <p className="text-gray-700">{user?.role || 'Pengguna'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaCalendarAlt className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Bergabung Sejak</p>
                                                <p className="text-gray-700">
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleActivateClick}
                                    className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-medium shadow-sm"
                                >
                                    <FaCheckCircle className="w-5 h-5 mr-2" />
                                    Aktifkan Pengguna
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
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
    );
};

export default UserSuspend;