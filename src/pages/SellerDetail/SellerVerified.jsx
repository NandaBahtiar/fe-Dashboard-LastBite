import ImageWithLoading from '../../components/ImageWithLoading/ImageWithLoading.jsx';
import React, { useEffect, useState } from 'react';
import {
    FaBox,
    FaCalendarAlt,
    FaEnvelope,
    FaFilePdf,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPhone,
    FaReceipt,
    FaStar,
    FaShoppingBag,
    FaUser,
    FaCheckCircle,
    FaTimes,
    FaExternalLinkAlt,
    FaUndo
} from "react-icons/fa";
 import useSellerDetail from "../../hooks/useSellerDetail.js";
import useMenuItem from "../../hooks/useMenuItem.js";
import Loading from "../../components/Loading/Loading.jsx";
import {useSelector} from "react-redux";
import Swal from 'sweetalert2';
import ReviewModal from '../../components/Modal/ReviewModal.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const SellerVerified = ({ user }) => {
    const { updateSeller, fetchSellerMenu } = useSellerDetail();
    const { deleteMenuItem } = useMenuItem();
    const { menu: menuData, pagination, loading, error } = useSelector(state => state.sellerMenu);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedItemForReview, setSelectedItemForReview] = useState(null);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [suspendedUntil, setSuspendedUntil] = useState(null);
    const [suspendedReason, setSuspendedReason] = useState('');
    const menu = menuData || [];

    useEffect(() => {
        if (user) {
            fetchSellerMenu({ sellerId: user.id, page: currentPage, size: 2, name: searchName });
        }
    }, [user, fetchSellerMenu, currentPage, searchName]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && pagination && newPage < pagination.totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (!user) {
        return <Loading/>
    }

    const handleOpenReviewModal = (item) => {
        setSelectedItemForReview(item);
        setReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setReviewModalOpen(false);
        setSelectedItemForReview(null);
    };

    const handleUnverify = () => {
        setShowSuspendModal(true);
    };

    const handleCloseSuspendModal = () => {
        setShowSuspendModal(false);
        setSuspendedUntil(null);
        setSuspendedReason('');
    };

    const handleConfirmSuspend = () => {
        if (suspendedUntil && suspendedReason) {
            const selectedDate = dayjs(suspendedUntil);
            if (selectedDate.isBefore(dayjs().add(1, 'day'))) {
                setShowSuspendModal(false);
                Swal.fire(
                    'Gagal!',
                    'Tanggal penangguhan tidak boleh kurang dari hari besok.',
                    'error'
                );
                return;
            }

            const date = new Date(suspendedUntil);
            date.setHours(23, 59, 59, 999); // Set to the end of the day
            const isoDateString = date.toISOString();

            updateSeller({ id: user.id, isVerified: false, suspendedUntil: isoDateString, suspendedReason: suspendedReason });
            setShowSuspendModal(false);
            setSuspendedUntil(null);
            setSuspendedReason('');
            Swal.fire(
                'Ditangguhkan!',
                'Penjual telah ditangguhkan.',
                'success'
            );
        } else {
            setShowSuspendModal(false);
            Swal.fire(
                'Gagal!',
                'Tanggal dan alasan penangguhan harus diisi.',
                'error'
            );
        }
    };

    const handleRestoreItem = (itemId) => {
        Swal.fire({
            title: 'Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteMenuItem(itemId,false);
                    fetchSellerMenu({ sellerId: user.id, page: currentPage, size: 2, name: searchName });
                    Swal.fire(
                        'Berhasil!',
                        'Item telah dikembalikan.',
                        'success'
                    )
                } catch (error) {
                    console.error("Failed to delete menu item:", error);
                    Swal.fire(
                        'Gagal!',
                        'Gagal menghapus item.',
                        'error'
                    )
                }
            }
        })
    };

    const handleDeleteItem = async (itemId) => {
        Swal.fire({
            title: 'Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteMenuItem(itemId,true);
                    fetchSellerMenu({ sellerId: user.id, page: currentPage, size: 2, name: searchName });
                    Swal.fire(
                        'Dihapus!',
                        'Item telah dihapus.',
                        'success'
                    )
                } catch (error) {
                    console.error("Failed to delete menu item:", error);
                    Swal.fire(
                        'Gagal!',
                        'Gagal menghapus item.',
                        'error'
                    )
                }
            }
        })
    };
    // const data = {
    //     latitude: user?.latitude || -7.983908, // Default ke Malang jika tidak ada
    //     longitude: user?.longitude || 112.621391 // Default ke Malang jika tidak ada
    // };

    // Enhanced map styling options

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Penjual</h1>
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                <FaCheckCircle className="w-4 h-4 mr-1" />
                                Terverifikasi
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
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                                <div className="flex flex-col items-center text-white">
                                    {/* Container untuk Avatar/Logo.
          - Overflow-hidden ditambahkan untuk memastikan tidak ada bagian dari gambar
            yang keluar dari area bulat, sebagai pengaman tambahan.
          - Posisi 'relative' ditambahkan untuk konteks positioning jika diperlukan di masa depan.
        */}
                                    <div className="relative w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm ring-4 ring-white/30 overflow-hidden">
                                        {user.storeImageUrl ? (
                                            // JIKA ADA GAMBAR: Tampilkan gambar, pastikan gambar juga bulat.
                                            <ImageWithLoading
                                                src={user?.storeImageUrl}
                                                alt={user?.storeName || 'Logo Toko'}
                                                className="w-full h-full object-cover" // object-cover penting agar gambar tidak penyok.
                                            />
                                        ) : (
                                            // JIKA TIDAK ADA GAMBAR: Tampilkan inisial nama toko.
                                            <span className="text-3xl font-bold">
                    {user?.storeName?.charAt(0).toUpperCase() || 'M'}
                </span>
                                        )}
                                    </div>

                                    {/* Informasi Toko
          - text-center pada h2 dihapus karena sudah di-handle oleh items-center di parent.
        */}
                                    <h2 className="text-xl font-semibold">{user?.storeName || 'Nama Toko'}</h2>
                                    <p className="text-green-100 text-sm mt-1">{user?.storeDescription || 'Deskripsi singkat toko'}</p>
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

                        {/* Map Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                {/*<div className="flex items-center justify-between mb-4">*/}
                                {/*    <h3 className="text-lg font-semibold text-gray-900">Lokasi Toko</h3>*/}
                                {/*    <div className="flex items-center text-sm text-gray-500">*/}
                                {/*        <FaMapMarkerAlt className="w-4 h-4 mr-1" />*/}
                                {/*        <span>Peta Interaktif</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="relative rounded-xl overflow-hidden shadow-inner border border-gray-200">*/}
                                {/*    <div className="absolute top-3 left-3 z-10">*/}
                                {/*        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">*/}
                                {/*            <div className="flex items-center text-sm text-gray-700">*/}
                                {/*                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>*/}
                                {/*                <span className="font-medium">{user?.storeName || 'Toko'}</span>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="h-72">*/}

                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="mt-4 ">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${user?.latitude},${user?.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-50 text-blue-600 py-2.5 px-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-sm font-medium"
                                    >
                                        <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                                        Google Maps
                                    </a>
                                    {/*<button*/}
                                    {/*    onClick={() => {*/}
                                    {/*        navigator.clipboard.writeText(`${data.latitude}, ${data.longitude}`);*/}
                                    {/*        // Optional: Add toast notification here*/}
                                    {/*    }}*/}
                                    {/*    className="bg-gray-50 text-gray-600 py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-sm font-medium"*/}
                                    {/*>*/}
                                    {/*    <FaMapMarkerAlt className="w-4 h-4 mr-2" />*/}
                                    {/*    Copy Koordinat*/}
                                    {/*</button>*/}
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <button
                                onClick={handleUnverify}
                                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center font-medium"
                            >
                                <FaTimes className="w-4 h-4 mr-2" />
                                Suspend Seller
                            </button>
                        </div>
                    </div>

                    {/* Kolom Kanan - Aktivitas Partner */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Statistik Partner */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Card Total Transaksi */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="flex flex-col  items-center   gap-3 sm:gap-4 text-center ">
                                    <div className="p-2 sm:p-3 rounded-lg bg-blue-50 flex-shrink-0">
                                        <FaReceipt className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                                            Total Transaksi
                                        </h3>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                                            {user?.totalOrders }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Total Pendapatan */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
                                    <div className="p-2 sm:p-3 rounded-lg bg-green-50 flex-shrink-0">
                                        <FaMoneyBillWave className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                                    </div>
                                    <div className="w-full min-w-0">
                                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                                            Total Pendapatan
                                        </h3>
                                        <p className={`font-bold text-gray-900 break-words overflow-hidden leading-tight ${
                                            user?.balance && user.balance.toString().length > 12
                                                ? 'text-sm sm:text-base'
                                                : user?.balance && user.balance.toString().length > 10
                                                    ? 'text-base sm:text-lg'
                                                    : user?.balance && user.balance.toString().length > 7
                                                        ? 'text-lg sm:text-xl'
                                                        : 'text-xl sm:text-2xl'
                                        }`}>
                <span className="inline-block max-w-full">
                    Rp {user?.balance?.toLocaleString('id-ID') || 0}
                </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Rating Rata-rata */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="flex flex-col  items-center   gap-3 sm:gap-4 text-center ">
                                    <div className="p-2 sm:p-3 rounded-lg bg-yellow-50 flex-shrink-0">
                                        <FaStar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                                            Rating Rata-rata
                                        </h3>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                                            {user?.averageRating || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Daftar Menu */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900">Daftar Item</h3>
                                    <span className="text-sm text-gray-500">{menu.length} items</span>
                                </div>
                                <div className="mt-4 flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Cari menu berdasarkan nama..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                        value={searchName}
                                        onChange={(e) => {
                                            setSearchName(e.target.value);
                                            setCurrentPage(0); // Reset to first page on new search
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {loading ? (
                                    <Loading />
                                ) : error ? (
                                    <div className="p-6 text-center text-red-500">Error: {error}</div>
                                ) : menu.length > 0 ? (
                                    menu.map((item) => (

                                        <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden hover:shadow-xl shadow-sm">
                                            {/* Main Content */}
                                            <div className="p-6">
                                                <div className="flex items-start gap-5">
                                                    {/* Product Image */}
                                                    <div className="relative flex-shrink-0">
                                                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                                            <ImageWithLoading
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        {/* Status Badge */}
                                                        <div className="absolute -top-2 -right-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                        {item.status}
                    </span>
                                                        </div>
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-6">
                                                            {/* Left: Product Info */}
                                                            <div className="flex-1">
                                                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                                                                    {item.name}
                                                                </h3>
                                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                                                    {item.description}
                                                                </p>

                                                                {/* Period Display */}
                                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                                    <span className="text-xs font-medium text-gray-700">
                                {new Date(item.displayStartTime).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short'
                                })} - {new Date(item.displayEndTime).toLocaleDateString('id-ID', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric'
                                                                    })}
                            </span>
                                                                </div>
                                                            </div>

                                                            {/* Right: Price & Stock */}
                                                            <div className="text-right flex-shrink-0">
                                                                <div className="space-y-3">
                                                                    {/* Pricing */}
                                                                    <div>
                                                                        <p className="text-sm text-gray-400 line-through mb-1">
                                                                            {formatCurrency(item.originalPrice)}
                                                                        </p>
                                                                        <p className="text-xl font-bold text-gray-900">
                                                                            {formatCurrency(item.discountedPrice)}
                                                                        </p>
                                                                    </div>

                                                                    {/* Stock Info */}
                                                                    <div className="pt-3 border-t border-gray-100">
                                                                        <div className="flex items-center justify-end gap-2">
                                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                            <span className="text-sm font-medium text-gray-700">
                                        {item.quantityAvailable} tersedia
                                    </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100">
                                                    <button
                                                        onClick={() => handleOpenReviewModal(item)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors duration-200"
                                                    >
                                                        <FaStar className="w-4 h-4" />
                                                        Review
                                                    </button>
                                                    <div className="flex items-center gap-3">
                                                        {item.isDelleted ? (
                                                            <button
                                                                onClick={() => handleRestoreItem(item.id)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors duration-200"
                                                            >
                                                                <FaUndo className="w-4 h-4" />
                                                                Restore
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleDeleteItem(item.id)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-colors duration-200"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Hapus
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        Tidak ada Item yang tersedia.
                                    </div>
                                )}

                                {pagination && pagination.totalElements > 0 && (

                                    <div className="p-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">

                                        <div className="text-sm text-gray-700 mb-4 md:mb-0">
                                            Menampilkan <span className="font-medium">{(pagination.page * pagination.size) + 1}</span> sampai <span className="font-medium">{Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)}</span> dari <span className="font-medium">{pagination.totalElements}</span> Entri
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 0}
                                                className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Sebelumnya
                                            </button>
                                            <span className="px-3 py-2 text-sm text-gray-600">
                                                Halaman {pagination.page + 1} dari {pagination.totalPages || 1}
                                            </span>
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={!pagination.totalPages || currentPage + 1 >= pagination.totalPages}
                                                className="px-4 py-2 border rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Selanjutnya
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewModal item={selectedItemForReview} onClose={handleCloseReviewModal} />

            {showSuspendModal && (
                <div className="fixed  inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Konfirmasi Penangguhan Penjual</h3>
                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">Apakah Anda yakin ingin menangguhkan penjual ini? Tindakan ini akan menonaktifkan akun penjual.</p>
                            <div className="mb-4 relative">
                                <label htmlFor="suspendedUntil" className="block text-gray-700 text-sm font-bold mb-2">Tanggal Akhir Penangguhan *:</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Pilih Tanggal"
                                        value={suspendedUntil ? dayjs(suspendedUntil) : null}
                                        onChange={(newValue) => setSuspendedUntil(newValue ? newValue.format('YYYY-MM-DD') : '')}
                                        minDate={dayjs().add(1, 'day')}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                variant: "outlined",
                                                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            },
                                            popper: {
                                                sx: {
                                                    zIndex: 9999
                                                }
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="suspendedReason" className="block text-gray-700 text-sm font-bold mb-2">Alasan Penangguhan:</label>
                                <textarea
                                    id="suspendedReason"
                                    value={suspendedReason}
                                    onChange={(e) => setSuspendedReason(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="3"
                                    placeholder="Masukkan alasan penangguhan..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                                onClick={handleCloseSuspendModal}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                onClick={handleConfirmSuspend}
                            >
                                Tangguhkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerVerified;