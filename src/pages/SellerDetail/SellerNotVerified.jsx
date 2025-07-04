import React from 'react';
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
    FaClock,
    FaCheck,
    FaTimes,
    FaDownload,
    FaEye,
    FaExclamationTriangle
} from 'react-icons/fa';

const SellerNotVerified = ({ user, UpdateSeller }) => {
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

    const handleVerify = () => {
        console.log("ini ser: ", user);
        UpdateSeller(user, true);
    };

    const handleReject = () => {
        console.log("Rejecting user:", user.id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Mitra</h1>
                        <div className="flex items-center space-x-2">
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                <FaClock className="w-4 h-4 mr-1" />
                                Menunggu Verifikasi
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kolom Kiri - Profil Partner */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6">
                                <div className="flex flex-col items-center text-white">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 ring-4 ring-white/30">
                                        {user?.storeName ? user.storeName.charAt(0).toUpperCase() : 'M'}
                                    </div>
                                    <h2 className="text-xl font-semibold text-center">{user?.storeName || 'N/A'}</h2>
                                    <p className="text-gray-100 text-sm mt-1">{user?.storeDescription || 'Toko'}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-600">
                                        <FaEnvelope className="w-4 h-4 mr-3 text-gray-400" />
                                        <span className="text-sm">{user?.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-start text-gray-600">
                                        <FaMapMarkerAlt className="w-4 h-4 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                        <span className="text-sm">{user?.address || 'N/A'}</span>
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

                        {/* Documents Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <FaFilePdf className="w-5 h-5 mr-3 text-gray-500" />
                                    <h3 className="text-lg font-semibold text-gray-900">Dokumen Verifikasi</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <FaFilePdf className="w-4 h-4 mr-2 text-red-500" />
                                            <span className="text-sm font-medium text-gray-700">Surat Izin Usaha.pdf</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
                                                <FaEye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-500 hover:text-green-600 transition-colors">
                                                <FaDownload className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <FaFilePdf className="w-4 h-4 mr-2 text-red-500" />
                                            <span className="text-sm font-medium text-gray-700">KTP Pemilik.pdf</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
                                                <FaEye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-500 hover:text-green-600 transition-colors">
                                                <FaDownload className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="space-y-3">
                                <button
                                    onClick={handleReject}
                                    className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center font-medium"
                                >
                                    <FaTimes className="w-4 h-4 mr-2" />
                                    Tolak
                                </button>
                                <button
                                    onClick={handleVerify}
                                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-medium"
                                >
                                    <FaCheck className="w-4 h-4 mr-2" />
                                    Verifikasi Toko
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan - Aktivitas Partner */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Statistik Partner - Disabled State */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 opacity-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-lg bg-gray-100">
                                        <FaReceipt className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">Tidak Aktif</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Transaksi</h3>
                                <p className="text-2xl font-bold text-gray-800">0</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 opacity-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-lg bg-gray-100">
                                        <FaMoneyBillWave className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">Tidak Aktif</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Pendapatan</h3>
                                <p className="text-2xl font-bold text-gray-800">Rp 0</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 opacity-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-lg bg-gray-100">
                                        <FaStar className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">Tidak Aktif</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600 mb-1">Rating Rata-rata</h3>
                                <p className="text-2xl font-bold text-gray-800">-</p>
                            </div>
                        </div>

                        {/* Daftar Menu - Disabled State */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900">Daftar Menu</h3>
                                    <button
                                        className="bg-gray-200 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed flex items-center"
                                        disabled
                                    >
                                        <FaBox className="w-4 h-4 mr-2" />
                                        Tambah Menu
                                    </button>
                                </div>
                            </div>
                            <div className="p-12">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                        <FaBox className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Menu</h4>
                                    <p className="text-gray-500 max-w-md">
                                        Mitra ini belum menambahkan menu apapun. Menu akan dapat diakses setelah akun terverifikasi.
                                    </p>
                                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <FaClock className="w-4 h-4 text-yellow-600 mr-2" />
                                            <span className="text-sm text-yellow-800 font-medium">
                                                Menunggu verifikasi untuk mengaktifkan fitur menu
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerNotVerified;