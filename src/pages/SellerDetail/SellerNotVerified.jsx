import React, {useState} from 'react';
import {
    FaClock,
    FaCheck,
    FaTimes,
    FaExclamationTriangle,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaFilePdf,
    FaExternalLinkAlt,
    FaInfoCircle
} from 'react-icons/fa';
import useSellerDetail from '../../hooks/useSellerDetail';
import ImageWithLoading from '../../components/ImageWithLoading/ImageWithLoading.jsx';
import Swal from 'sweetalert2';

const SellerNotVerified = ({ user, UpdateSeller }) => {
    const { cenceledSeller, deleteSeller, approveOrRejectSeller } = useSellerDetail();
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <FaExclamationTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Tidak ada data pengguna yang tersedia.</p>
                </div>
            </div>
        );
    }

    const handleVerify = () => {
        Swal.fire({
            title: 'Verifikasi Penjual',
            text: "Anda yakin ingin memverifikasi penjual ini?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Verifikasi!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                approveOrRejectSeller({ id: user.id, isVerified: true});
                Swal.fire(
                    'Terverifikasi!',
                    'Penjual telah berhasil diverifikasi.',
                    'success'
                );
            }
        });
    };

    const handleReject = () => {
        setShowRejectModal(true,);
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
        setRejectionReason('');
    };

    const handleConfirmReject = () => {
        if (rejectionReason) {
            approveOrRejectSeller({ id: user.id, isVerified: false, cancelReason: rejectionReason });
            setShowRejectModal(false);
            setRejectionReason('');
            Swal.fire(
                'Ditolak!',
                'Verifikasi penjual telah ditolak.',
                'success'
            );
        } else {
            Swal.fire(
                'Gagal!',
                'Alasan penolakan harus diisi.',
                'error'
            );
        }
    };

    const isCancelled = user.status === 'CANCELLED';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Detail Penjual</h1>
                        <span className={`text-sm font-medium px-4 py-2 rounded-full flex items-center ${isCancelled ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {isCancelled ? <FaTimes className="w-4 h-4 mr-2" /> : <FaClock className="w-4 h-4 mr-2" />}
                            {isCancelled ? 'Dibatalkan' : 'Menunggu Verifikasi'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Status Section */}
                    <div className={`${isCancelled ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'} border-b p-8 text-center`}>
                        <FaExclamationTriangle className={`w-16 h-16 ${isCancelled ? 'text-red-500' : 'text-yellow-500'} mx-auto mb-4`} />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {isCancelled ? 'Penjual Dibatalkan' : 'Penjual Belum Terverifikasi'}
                        </h2>
                        <p className="text-gray-600">
                            Akun penjual <span className="font-semibold text-gray-900">{user.storeName}</span>
                            {isCancelled ? ' telah dibatalkan.' : ' sedang menunggu verifikasi.'}
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Verification Documents */}
                            <div className="space-y-6">
                                {user?.storeImageUrl && (
                                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <FaFilePdf className="w-5 h-5 mr-3 text-blue-500" />
                                            Dokumen Verifikasi
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="bg-white rounded-lg p-4 border border-blue-200">
                                                <p className="text-sm text-gray-600 mb-3">Klik untuk melihat dokumen verifikasi:</p>
                                                <a href={user.storeImageUrl} target="_blank" rel="noopener noreferrer">
                                                    <ImageWithLoading
                                                        src={user.storeImageUrl}
                                                        alt="Dokumen Verifikasi"
                                                        className="w-full h-auto rounded-lg border border-gray-200 cursor-pointer"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Status Information */}
                                <div className={`${isCancelled ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'} rounded-lg p-6 border`}>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Verifikasi</h3>
                                    <div className="flex items-start">
                                        {isCancelled ? (
                                            <FaTimes className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0" />
                                        ) : (
                                            <FaClock className="w-5 h-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900 mb-1">
                                                {isCancelled ? 'Verifikasi Dibatalkan' : 'Menunggu Verifikasi'}
                                            </p>
                                            <p className="text-gray-700 text-sm">
                                                {isCancelled ?
                                                    'Akun penjual ini telah dibatalkan dan tidak dapat diverifikasi.' :
                                                    'Penjual ini sedang menunggu proses verifikasi dari admin.'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Seller Information */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Informasi Penjual</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <FaEnvelope className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Email</p>
                                                <p className="text-gray-700">{user?.email || 'Tidak Tersedia'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaPhone className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Nomor Telepon</p>
                                                <p className="text-gray-700">{user?.phoneNumber || 'Tidak Tersedia'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Alamat</p>
                                                <p className="text-gray-700">{user?.address || 'Tidak Tersedia'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Deskripsi Toko</p>
                                                <p className="text-gray-700">{user?.storeDescription || 'Tidak ada deskripsi.'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaCalendarAlt className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Bergabung Sejak</p>
                                                <p className="text-gray-700">
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : 'Tidak Tersedia'}
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
                                {!isCancelled && (
                                    <button
                                        onClick={handleVerify}
                                        className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center font-medium shadow-sm"
                                    >
                                        <FaCheck className="w-5 h-5 mr-2" />
                                        Verifikasi Penjual
                                    </button>
                                )}
                                <button
                                    onClick={handleReject}
                                    className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center font-medium shadow-sm"
                                >
                                    <FaTimes className="w-5 h-5 mr-2" />
                                    Tolak Verifikasi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showRejectModal && (
                <div className="fixed  inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Konfirmasi Penolakan Verifikasi Penjual</h3>
                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">Apakah Anda yakin ingin menolak verifikasi penjual ini? Tindakan ini akan membatalkan akun penjual.</p>
                            <div className="mb-4">
                                <label htmlFor="rejectionReason" className="block text-gray-700 text-sm font-bold mb-2">Alasan Penolakan:</label>
                                <textarea
                                    id="rejectionReason"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="3"
                                    placeholder="Masukkan alasan penolakan..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                                onClick={handleCloseRejectModal}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                onClick={handleConfirmReject}
                            >
                                Tolak Verifikasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerNotVerified;