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
                                        href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`}
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
                                            {user?.totalTransactions || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Total Pendapatan */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="flex flex-col  items-center   gap-3 sm:gap-4 text-center ">
                                    <div className="p-2 sm:p-3 rounded-lg bg-green-50 flex-shrink-0">
                                        <FaMoneyBillWave className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                                            Total Pendapatan
                                        </h3>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                                            {user?.balance || 0}
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
                                        <div key={item.id} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-50 transition-all duration-200">
                                            <div className="flex items-center justify-between gap-6">
                                                {/* Product Info Section */}
                                                <div className="flex items-center space-x-4 flex-1">
                                                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                    </div>
                                                </div>


                                                {/* Display Time Section */}
                                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg border border-green-200">
                                                    <div className="flex items-center justify-center mb-1">
                                                        <span className="text-xs font-medium text-green-700">📅 Periode Tampil</span>
                                                    </div>
                                                    <p className="text-xs text-green-700 text-center leading-relaxed">
                                                        {new Date(item.displayStartTime).toLocaleDateString('id-ID', {
                                                            day: '2-digit',
                                                            month: 'short'
                                                        })} - {new Date(item.displayEndTime).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                    </p>
                                                </div>
                                                {/* Price and Stock Section */}
                                                <div className="text-right flex-shrink-0 min-w-[180px]">
                                                    <div className="space-y-2">
                                                        <div>
                                                            <p className="text-sm text-gray-500 line-through">
                                                                {formatCurrency(item.originalPrice)}
                                                            </p>
                                                            <p className="font-bold text-lg text-orange-600">
                                                                {formatCurrency(item.discountedPrice)}
                                                            </p>
                                                        </div>



                                                        <div className="pt-2 border-t border-gray-200">
                                                            <p className="text-sm text-gray-600">
                                                                Stok: <span className="font-semibold text-gray-900">{item.quantityAvailable}</span>
                                                            </p>
                                                        </div>
                                                    </div>
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