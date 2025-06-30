import React from 'react'
import {
    FaBox,
    FaCalendarAlt,
    FaEnvelope,
    FaFilePdf,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPhone,
    FaReceipt, FaStar
} from "react-icons/fa";

const PartnersVerified = () => {
    return (

        <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Detail Mitra</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri - Profil PartnerDetail */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                                RB
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">Roti Buana</h2>
                            <p className="text-gray-600 flex items-center mt-1">
                                <FaEnvelope className="mr-2 text-gray-500" /> info@rotibuana.id
                            </p>
                            <div className="flex space-x-2 mt-3">
                                <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Menunggu Verifikasi</span>
                                <span className="bg-purple-200 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Toko Roti</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Detail</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <FaMapMarkerAlt className="mr-3 mt-1 text-gray-500 flex-shrink-0" />
                                    <span>Jl. Merdeka No. 5, Jakarta</span>
                                </li>
                                <li className="flex items-center">
                                    <FaPhone className="mr-3 text-gray-500" />
                                    <span>0811-1234-5678</span>
                                </li>
                                <li className="flex items-center">
                                    <FaCalendarAlt className="mr-3 text-gray-500" />
                                    <span>28 Juni 2025</span>
                                </li>
                                <li className="flex items-start flex-col">
                                    <div className="flex items-center mb-2">
                                        <FaFilePdf className="mr-3 text-gray-500" />
                                        <span>Dokumen Verifikasi:</span>
                                    </div>
                                    <ul className="ml-8 space-y-1">
                                        <li>
                                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                                                <FaFilePdf className="mr-2" /> Surat Izin Usaha.pdf
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-blue-600 hover:underline flex items-center">
                                                <FaFilePdf className="mr-2" /> KTP Pemilik.pdf
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 flex flex-col space-y-3">
                            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                                Tolak
                            </button>
                            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                                Verifikasi Toko
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan - Aktivitas PartnerDetail */}
                <div className="lg:col-span-2">
                    {/* Statistik PartnerDetail */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center opacity-50">
                            <FaReceipt className="text-4xl text-blue-500 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700">Total Transaksi</h3>
                            <p className="text-2xl font-bold text-gray-800">0</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center opacity-50">
                            <FaMoneyBillWave className="text-4xl text-green-500 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700">Total Pendapatan</h3>
                            <p className="text-2xl font-bold text-gray-800">Rp 0</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center opacity-50">
                            <FaStar className="text-4xl text-yellow-500 mb-3" />
                            <h3 className="text-lg font-semibold text-gray-700">Rating Rata-rata</h3>
                            <p className="text-2xl font-bold text-gray-800">-</p>
                        </div>
                    </div>

                    {/* Daftar Menu */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Daftar Menu (Belum Aktif)</h3>
                            <button
                                className="bg-gray-300 text-gray-600 py-2 px-4 rounded-md cursor-not-allowed"
                                disabled
                            >
                                Tambah Menu
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-300 text-gray-500">
                            <FaBox className="text-6xl mb-4" />
                            <p className="text-lg">Belum ada menu yang ditambahkan oleh mitra ini</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PartnersVerified
