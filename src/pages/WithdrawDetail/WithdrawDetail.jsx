import React, {useCallback, useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useWithdrawalDetail from '../../hooks/useWithdrawalDetail';
import {useSelector} from "react-redux";
import useSellerDetail from "../../hooks/useSellerDetail.js";
import Loading from "../../components/Loading/Loading.jsx";
import useImageUpload from "../../hooks/useImageUpload.js";




const WithdrawDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sellerId = queryParams.get('sellerId');
    const navigate = useNavigate();
    const { withdrawalDetail, status, error, approveWithdrawal, rejectWithdrawal } = useWithdrawalDetail(id);
    const { fetchSellerDetail, updateSeller } = useSellerDetail();
    const { sellerDetail, status: sellerStatus, error: sellerError } = useSelector((state) => state.sellerDetail);
    const { uploadImage, isLoading: isUploading, error: uploadError, data: uploadData } = useImageUpload();
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const result = await Swal.fire({
                    title: 'Apakah gambar sudah benar?',
                    text: "Pastikan gambar yang diunggah adalah bukti transfer yang benar.",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, sudah benar!',
                    cancelButtonText: 'Batal'
                });

                if (result.isConfirmed) {
                    await uploadImage(selectedFile);
                    Swal.fire('Berhasil', 'Gambar berhasil diunggah!', 'success');
                } else {
                    Swal.fire('Dibatalkan', 'Pengunggahan gambar dibatalkan.', 'info');
                }
            } catch (err) {
                Swal.fire('Error', uploadError || 'Gagal mengunggah gambar.', 'error');
            }
        } else {
            Swal.fire('Peringatan', 'Mohon pilih file terlebih dahulu.', 'warning');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    useEffect(() => {
        if (sellerId) {
            fetchSellerDetail( sellerId );
        }

        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [sellerId, fetchSellerDetail, imagePreview]);





    if (status === 'loading' || status === 'updating' || sellerStatus === 'loading') {
        return (
            <>
                    <Loading/>
            </>
        );
    }

    if (status === 'failed' || sellerStatus === 'failed') {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Penarikan</h1>
                        {/*<p className="text-gray-600 mt-1">View and manage withdrawal requests</p>*/}
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-red-800">Gagal Memuat Data</h3>
                                <p className="text-red-600 mt-1">{error?.message || sellerError?.message || 'Gagal mengambil detail'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!withdrawalDetail) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Penarikan</h1>
                        {/*<p className="text-gray-600 mt-1">View and manage withdrawal requests</p>*/}
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Tidak Ditemukan</h3>
                            <p className="text-gray-600">Detail penarikan tidak ditemukan untuk ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Detail Penarikan</h1>
                    {/*<p className="text-gray-600 mt-1">View and manage withdrawal requests</p>*/}
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Withdrawal Information Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Informasi Penarikan
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">ID Penarikan</p>
                                    <p className="text-lg font-semibold text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">
                                        {withdrawalDetail.data.id}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Jumlah</p>
                                    <p className="text-lg font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                        {formatCurrency(withdrawalDetail.data.amount)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</p>
                                    <div className="inline-flex">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            withdrawalDetail.data.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : withdrawalDetail.data.status === 'APPROVED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                        }`}>
                                            {withdrawalDetail.data.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tanggal Permintaan</p>
                                    <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                        {new Date(withdrawalDetail.data.requestDate).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information Card */}
                    {sellerDetail && (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    Informasi Penjual
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">ID Penjual</p>
                                        <p className="text-lg font-semibold text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">
                                            {sellerDetail.id}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nama Toko</p>
                                        <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                            {sellerDetail.storeName}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</p>
                                        <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg break-all">
                                            {sellerDetail.email}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Telepon</p>
                                        <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                            {sellerDetail.phoneNumber}
                                        </p>
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Alamat</p>
                                        <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                            {sellerDetail.address}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nama Bank</p>
                                        <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                            {withdrawalDetail.data.bankName || "Belum Dipilih"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nomor Rekening</p>
                                        <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                            {withdrawalDetail.data.accountNumber || "Belum Dipilih"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Diproses Oleh</p>
                                        <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                            {withdrawalDetail.data.processedBy || 'Belum Diproses'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Saldo</p>
                                        <p className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                                            {formatCurrency(sellerDetail.balance)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Proof of Transfer Card */}
                    {withdrawalDetail.data.proofOfPaymentUrl ? (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6l2-2m0 0l2 2m-2-2v12"></path>
                                    </svg>
                                 Ungah bukti
                                </h2>
                            </div>
                            <div className="p-6">
                                <img src={withdrawalDetail.data.proofOfPaymentUrl} alt="Bukti Transfer" className="w-full max-w-lg aspect-[4/3] object-cover rounded-lg"/>
                            </div>
                        </div>
                    ) : withdrawalDetail.data.cancelReason ? (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                                    </svg>
                                    Alasan Pembatalan
                                </h2>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600">{withdrawalDetail.data.cancelReason}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                    Ungah bukti
                                </h2>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">Belum ada bukti transfer yang diunggah. Silakan unggah bukti transfer.</p>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                                />
                                <p className="mt-1 text-sm text-gray-500" id="file_input_help">jpg atau png</p>
                                {imagePreview && (
                                    <div className="mt-4">
                                        <img src={imagePreview} alt="Image Preview" className="w-full max-w-xs h-auto rounded-lg shadow-md" />
                                    </div>
                                )}
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {isUploading ? 'Mengunggah...' : 'Unggah Gambar'}
                                </button>
                                {uploadError && <p className="text-red-500 text-sm mt-2">Error: {uploadError}</p>}
                                {uploadData && <p className="text-green-500 text-sm mt-2">Upload successful!</p>}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                {withdrawalDetail.data.status === 'PENDING' && (
                                    <>
                                        <button
                                            onClick={async () => {
                                                Swal.fire({
                                                    title: 'Apakah Anda yakin?',
                                                    text: "Anda akan menyetujui penarikan ini!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Ya, setujui!'
                                                }).then(async (result) => {
                                                    if (result.isConfirmed) {
                                                        await approveWithdrawal(uploadData?.url);
                                                        Swal.fire(
                                                            'Berhasil!',
                                                            'Penarikan telah berhasil.',
                                                            'success'
                                                        );
                                                        // navigate('/dashboard/withdraw');
                                                    }
                                                });
                                            }}
                                            className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Proses
                                        </button>
                                        <button
                                            onClick={async () => {
                                                const { value: reason } = await Swal.fire({
                                                    title: 'Tolak Penarikan',
                                                    input: 'textarea',
                                                    inputLabel: 'Alasan Penolakan',
                                                    inputPlaceholder: 'Masukkan alasan penolakan di sini...',
                                                    inputAttributes: {
                                                        'aria-label': 'Masukkan alasan penolakan di sini'
                                                    },
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#d33',
                                                    cancelButtonColor: '#3085d6',
                                                    confirmButtonText: 'Ya, tolak!',
                                                    cancelButtonText: 'Batal',
                                                    preConfirm: (reason) => {
                                                        if (!reason) {
                                                            Swal.showValidationMessage('Alasan penolakan tidak boleh kosong')
                                                        }
                                                        return reason
                                                    }
                                                });

                                                if (reason) {
                                                    await rejectWithdrawal(reason);
                                                    Swal.fire(
                                                        'Ditolak!',
                                                        `Penarikan telah ditolak dengan alasan: ${reason}`,
                                                        'success'
                                                    );
                                                    // navigate('/dashboard/withdraw');
                                                }
                                            }}
                                            className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            Tolak
                                        </button>
                                    </>
                                )}
                                {sellerDetail && sellerDetail.status !== 'ACTIVE' && (
                                    <button
                                        onClick={async () => {
                                            await updateSeller({ id: sellerDetail.id, status: true });
                                        }}
                                        className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Verifikasi Penjual
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full sm:w-auto"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawDetail;