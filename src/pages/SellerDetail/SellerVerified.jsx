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
    FaExternalLinkAlt
} from "react-icons/fa";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import useSellerDetail from "../../hooks/useSellerDetail.js";
import { useSelector } from 'react-redux';

const SellerVerified = ({ user }) => {
    const { updateSeller, fetchSellerMenu } = useSellerDetail();
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const { menu, loading, error } = useSelector(state => state.sellerMenu);

    useEffect(() => {
        if (user) {
            fetchSellerMenu(user.id);
        }
    }, [user, fetchSellerMenu]);

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

    // Enhanced map styling options
    const mapOptions = {
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [
                    { color: "#f5f5f5" }
                ]
            },
            {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [
                    { saturation: 36 },
                    { color: "#333333" },
                    { lightness: 40 }
                ]
            },
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [
                    { visibility: "on" },
                    { color: "#ffffff" },
                    { lightness: 16 }
                ]
            },
            {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [
                    { color: "#fefefe" },
                    { lightness: 20 }
                ]
            },
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                    { color: "#fefefe" },
                    { lightness: 17 },
                    { weight: 1.2 }
                ]
            },
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                    { color: "#f5f5f5" },
                    { lightness: 20 }
                ]
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                    { color: "#f5f5f5" },
                    { lightness: 21 }
                ]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                    { color: "#dedede" },
                    { lightness: 21 }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [
                    { color: "#ffffff" },
                    { lightness: 17 }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                    { color: "#ffffff" },
                    { lightness: 29 },
                    { weight: 0.2 }
                ]
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    { color: "#ffffff" },
                    { lightness: 18 }
                ]
            },
            {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [
                    { color: "#ffffff" },
                    { lightness: 16 }
                ]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [
                    { color: "#f2f2f2" },
                    { lightness: 19 }
                ]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    { color: "#e9e9e9" },
                    { lightness: 17 }
                ]
            }
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

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
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Lokasi Toko</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                                        <span>Peta Interaktif</span>
                                    </div>
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-inner border border-gray-200">
                                    <div className="absolute top-3 left-3 z-10">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                                            <div className="flex items-center text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                                <span className="font-medium">{user?.storeName || 'Toko'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-72">
                                        <LoadScript
                                            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                                        >
                                            <GoogleMap
                                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                                center={{ lat: data.latitude, lng: data.longitude }}
                                                zoom={16}
                                                options={mapOptions}
                                            >
                                                <Marker
                                                    position={{ lat: data.latitude, lng: data.longitude }}
                                                    onClick={() => setShowInfoWindow(true)}
                                                    icon={{
                                                        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                                                        fillColor: "#10b981",
                                                        fillOpacity: 1,
                                                        strokeColor: "#ffffff",
                                                        strokeWeight: 2,
                                                        scale: 1.5,
                                                        anchor: { x: 12, y: 24 }
                                                    }}
                                                >
                                                    {showInfoWindow && (
                                                        <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
                                                            <div className="p-2 min-w-[200px]">
                                                                <div className="flex items-center mb-2">
                                                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                                                        {user?.storeName ? user.storeName.charAt(0).toUpperCase() : 'M'}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-semibold text-gray-800 text-sm">{user?.storeName}</h4>
                                                                        <p className="text-xs text-gray-500">Mitra Terverifikasi</p>
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-2">{user?.address}</p>
                                                                <div className="flex items-center text-xs text-gray-500">
                                                                    <FaPhone className="w-3 h-3 mr-1" />
                                                                    <span>{user?.phoneNumber || 'N/A'}</span>
                                                                </div>
                                                            </div>
                                                        </InfoWindow>
                                                    )}
                                                </Marker>
                                            </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-50 text-blue-600 py-2.5 px-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-sm font-medium"
                                    >
                                        <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                                        Google Maps
                                    </a>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${data.latitude}, ${data.longitude}`);
                                            // Optional: Add toast notification here
                                        }}
                                        className="bg-gray-50 text-gray-600 py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-sm font-medium"
                                    >
                                        <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                                        Copy Koordinat
                                    </button>
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
                                    <span className="text-sm text-gray-500">{menu.length} items</span>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {loading ? (
                                    <div className="p-6 text-center text-gray-500">Loading...</div>
                                ) : error ? (
                                    <div className="p-6 text-center text-red-500">Error: {error}</div>
                                ) : menu.length > 0 ? (
                                    menu.map((item) => (
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