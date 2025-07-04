import React from 'react';
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
    FaExternalLinkAlt
} from "react-icons/fa";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import useSellerDetail from "../../hooks/useSellerDetail.js";

const SellerVerified = ({ user }) => {
    const { updateSeller } = useSellerDetail();

    if (!user) {
        return <div>Loading user data...</div>;
    }

    const handleUnverify = () => {
        updateSeller({ id: user.id, isVerified: false });
    };
    const data = {
        latitude: user?.latitude || -7.983908, // Default ke Malang jika tidak ada
        longitude: user?.longitude || 112.621391 // Default ke Malang jika tidak ada
    };
    const position = [data.latitude, data.longitude];


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const menuItems = user?.menuItems || [];

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
            title: "Total Pendapatan",
            value: formatCurrency(parseInt(user?.balance || 0)),
            icon: FaMoneyBillWave,
            color: "text-green-500",
            bgColor: "bg-green-50",
            change: ""
        },
        {
            title: "Rating Rata-rata",
            value: user?.averageRating || "0",
            icon: FaStar,
            color: "text-yellow-500",
            bgColor: "bg-yellow-50",
            change: ""
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Mitra</h1>
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
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 ring-4 ring-white/30">
                                        {user?.storeName ? user.storeName.charAt(0).toUpperCase() : 'M'}
                                    </div>
                                    <h2 className="text-xl font-semibold text-center">{user?.storeName || 'N/A'}</h2>
                                    <p className="text-green-100 text-sm mt-1">{user?.storeDescription || 'Toko'}</p>
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
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lokasi Toko</h3>
                                <div className="bg-gray-100 rounded-lg h-64 mb-4">
                                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={position}>
                                                <Popup>
                                                    {user?.storeName || 'Lokasi Toko'}
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
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

                        {/* Daftar Menu */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900">Daftar Menu</h3>
                                    <span className="text-sm text-gray-500">{menuItems.length} items</span>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {menuItems.length > 0 ? (
                                    menuItems.map((item) => (
                                        <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                                                        <FaShoppingBag className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                                                        <p className="text-sm text-gray-500">{item.category}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                                                    <p className="text-sm text-gray-500">Stok: {item.stock}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        Tidak ada menu yang tersedia.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerVerified;