    import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox, FaUser, FaCheckCircle, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import useUserDetail from '../../hooks/useUserDetail';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

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
    const data = {
        latitude: user?.latitude || -7.983908, // Default ke Malang jika tidak ada
        longitude: user?.longitude || 112.621391 // Default ke Malang jika tidak ada
    };
    const position = [data.latitude, data.longitude];


    const stats = [
        {
            title: "Total Transaksi",
            value: user?.totalTransactions || "0",
            icon: FaReceipt,
            color: "text-blue-500",
            bgColor: "bg-blue-50",
            change: ""
        },
        {
            title: "Total Nilai Transaksi",
            value: user?.totalTransactionValue ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(user.totalTransactionValue) : "Rp 0",
            icon: FaMoneyBillWave,
            color: "text-green-500",
            bgColor: "bg-green-50",
            change: ""
        },
        {
            title: "Jumlah Pesanan",
            value: user?.totalOrders || "0",
            icon: FaBox,
            color: "text-purple-500",
            bgColor: "bg-purple-50",
            change: ""
        }
    ];

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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                        <span className="text-sm font-medium text-green-600">{stat.change}</span>
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Riwayat Aktivitas */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900">Riwayat Aktivitas</h3>
                                    <span className="text-sm text-gray-500">{/* Tambahkan jumlah aktivitas jika ada */}</span>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {/* Contoh data riwayat aktivitas */}
                                <div className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900">Login ke sistem</h4>
                                            <p className="text-sm text-gray-500">30 Juni 2025, 10:00</p>
                                        </div>
                                        <span className="text-sm text-gray-600">IP: 192.168.1.1</span>
                                    </div>
                                </div>
                                <div className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900">Mengubah pengaturan profil</h4>
                                            <p className="text-sm text-gray-500">29 Juni 2025, 14:30</p>
                                        </div>
                                        <span className="text-sm text-gray-600">IP: 192.168.1.1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed  inset-0 bg-black bg-opacity-50 z-100 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Konfirmasi Nonaktifkan Pengguna</h3>
                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">Apakah Anda yakin ingin menonaktifkan pengguna ini? Tindakan ini tidak dapat dibatalkan.</p>
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