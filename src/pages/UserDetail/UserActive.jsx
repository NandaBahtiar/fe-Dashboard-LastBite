    import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox, FaUser, FaCheckCircle, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import useUserDetail from '../../hooks/useUserDetail';
import useCustomerOrders from '../../hooks/useCustomerOrders'; // Import useCustomerOrders
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import Swal from 'sweetalert2';

const UserActive = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [suspensionDate, setSuspensionDate] = useState('');
    const [suspensionReason, setSuspensionReason] = useState('');
    const { updateUser } = useUserDetail();

    // Menggunakan hook useOrderDetail
    const { orders, pagination, loading: ordersLoading, error: ordersError, fetchCustomerOrders } = useCustomerOrders();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Ukuran halaman default
    // console.log("paging", pagination)
    useEffect(() => {
        if (user?.id) {
            console.log("Fetching orders for customer ID:", user.id, "Page:", currentPage, "Size:", pageSize);
            fetchCustomerOrders(user.id, currentPage, pageSize);
        } else {
            console.log("User ID not available yet.");
        }
    }, [user?.id, currentPage, pageSize, fetchCustomerOrders]);

    // Console log untuk memeriksa data yang diambil
    useEffect(() => {
        // console.log("Customer Orders:", orders);
        // console.log("Orders Pagination:", pagination);
        // console.log("Orders Loading:", ordersLoading);
        // console.log("Orders Error:", ordersError);
    }, [orders, pagination, ordersLoading, ordersError]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
        if (suspensionDate && suspensionReason) {
            const date = new Date(suspensionDate);
            date.setHours(23, 59, 59, 999); // Set to the end of the day
            const isoDateString = date.toISOString();
            updateUser({ id: user.id, date: isoDateString, reason: suspensionReason });
            setShowModal(false);
            setSuspensionDate('');
            setSuspensionReason('');
            Swal.fire(
                'Dinonaktifkan!',
                'Pengguna telah dinonaktifkan.',
                'success'
            );
        } else {
            Swal.fire(
                'Gagal!',
                'Tanggal dan alasan penangguhan harus diisi.',
                'error'
            );
        }
    };
    const data = {
        latitude: user?.latitude || -7.983908, // Default ke Malang jika tidak ada
        longitude: user?.longitude || 112.621391 // Default ke Malang jika tidak ada
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Pengguna</h1>
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                <FaCheckCircle className="w-4 h-4 mr-1" />
                                Aktif
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
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                                <div className="flex flex-col items-center text-white">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 ring-4 ring-white/30">
                                        {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <h2 className="text-xl font-semibold text-center">{user?.fullName || 'N/A'}</h2>
                                    <p className="text-blue-100 text-sm mt-1">{user?.role.replace(/[\[\]]/g, "").replace("ROLE_", "")
                                        || 'Pengguna'}</p>
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
                        {/* Map Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lokasi Pengguna</h3>
                                {/*<div className="bg-gray-100 rounded-lg h-64 mb-4 z-0">*/}
                                {/*    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>*/}
                                {/*        <TileLayer*/}
                                {/*            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                                {/*            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                                {/*        />*/}
                                {/*        <Marker position={position}>*/}
                                {/*            <Popup>*/}
                                {/*                {user?.fullName || 'Lokasi Pengguna'}*/}
                                {/*            </Popup>*/}
                                {/*        </Marker>*/}
                                {/*    </MapContainer>*/}
                                {/*</div>*/}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-sm font-medium"
                                >
                                    <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                                    Lihat di Google Maps
                                </a>
                            </div>
                        </div>
                        {/* Action Button */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <button
                                onClick={handleDeactivateClick}
                                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center font-medium"
                            >
                                <FaTimes className="w-4 h-4 mr-2" />
                                Nonaktifkan
                            </button>
                        </div>
                    </div>

                    {/* Kolom Kanan - Aktivitas Pengguna */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Statistik Pengguna */}
                        {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
                        {/*    {stats.map((stat, index) => (*/}
                        {/*        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">*/}
                        {/*            <div className="flex items-center justify-between mb-4">*/}
                        {/*                <div className={`p-3 rounded-lg ${stat.bgColor}`}>*/}
                        {/*                    <stat.icon className={`w-6 h-6 ${stat.color}`} />*/}
                        {/*                </div>*/}
                        {/*                <span className="text-sm font-medium text-green-600">{stat.change}</span>*/}
                        {/*            </div>*/}
                        {/*            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>*/}
                        {/*            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*</div>*/}

                        {/* Riwayat Pesanan */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900">Riwayat Pesanan</h3>
                                    <span className="text-sm text-gray-500">{pagination?.totalElements || 0} Pesanan</span>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-[27rem]  overflow-y-auto">
                                {ordersLoading === 'pending' ? (
                                    <div className="p-6 text-center text-gray-500">Memuat pesanan...</div>
                                ) : ordersError ? (
                                    <div className="p-6 text-center text-red-500">Error memuat pesanan: {ordersError}</div>
                                ) : orders && orders.length > 0 ? (
                                    orders.map((orderItem) => (
                                        <div key={orderItem.id} className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="font-medium text-gray-900 text-sm">
                                                            #{orderItem.id}
                                                        </h4>
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                            orderItem.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                                orderItem.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                    orderItem.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                        'bg-gray-100 text-gray-700'
                                                        }`}>
                    {orderItem.status || 'N/A'}
                </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        {orderItem.createdAt ? new Date(orderItem.createdAt).toLocaleDateString('id-ID') : 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="text-right ml-4">
            <span className="text-sm font-semibold text-gray-900">
                {orderItem.totalAmount ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(orderItem.totalAmount) : 'Rp 0'}
            </span>
                                                </div>
                                            </div>

                                            {/* Detail Pesanan */}
                                            {orderItem.orderItems && orderItem.orderItems.length > 0 && (
                                                <div className="bg-gray-50 rounded-lg p-3 mt-3">
                                                    <h5 className="font-medium text-gray-800 text-xs mb-2">Detail Pesanan</h5>
                                                    <div className="space-y-1">
                                                        {orderItem.orderItems.map((item, idx) => (
                                                            <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-gray-700">
                            {item.menuItemName} <span className="text-gray-500">({item.quantity}x)</span>
                        </span>
                                                                <span className="text-gray-600 font-medium">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.pricePerItem)}
                        </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-500">Tidak ada riwayat pesanan.</div>
                                )}
                            </div>

                            {pagination && pagination.totalElements > 0 && (
                                <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 border-t border-gray-200">
                                    <div className="text-sm text-gray-700 mb-4 md:mb-0">
                                        Menampilkan <span className="font-medium">{(pagination.page * pagination.size) + 1}</span> sampai <span className="font-medium">{Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)}</span> dari <span className="font-medium">{pagination.totalElements}</span> Entri
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 0 || ordersLoading === 'pending'}
                                            className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Sebelumnya
                                        </button>
                                        <span className="px-3 py-2 text-sm text-gray-600">
                                            Halaman {currentPage + 1} dari {pagination.totalPages || 1}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={!pagination.totalPages || currentPage + 1 >= pagination.totalPages || ordersLoading === 'pending'}
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

            {showModal && (
                <div className="fixed  inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Konfirmasi Nonaktifkan Pengguna</h3>
                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">Apakah Anda yakin ingin menonaktifkan pengguna ini? Tindakan ini tidak dapat dibatalkan.</p>
                            <div className="mb-4 relative">
                                <label htmlFor="suspensionDate" className="block text-gray-700 text-sm font-bold mb-2">Tanggal Penangguhan *:</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Pilih Tanggal"
                                        value={suspensionDate ? dayjs(suspensionDate) : null}
                                        onChange={(newValue) => setSuspensionDate(newValue ? newValue.format('YYYY-MM-DD') : '')}
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
                                <label htmlFor="suspensionReason" className="block text-gray-700 text-sm font-bold mb-2">Alasan Penangguhan:</label>
                                <textarea
                                    id="suspensionReason"
                                    value={suspensionReason}
                                    onChange={(e) => setSuspensionReason(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="3"
                                    placeholder="Masukkan alasan penangguhan..."
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                                onClick={handleCloseModal}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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