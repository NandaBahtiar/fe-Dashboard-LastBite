import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import useSeller from '../../hooks/useSeller.js';
import Loading from "../../components/Loading/Loading.jsx";

const Seller = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatnerId, setSelectedPatnerId] = useState(null);
    const { fetchPatners } = useSeller();
    const { patners, pagination, status, error } = useSelector((state) => state.patners);
    const loading = status === 'loading';

    console.log("page",pagination)

    const fetchData = useCallback((page = 0, size = 8) => {
        fetchPatners({ page, size, search: searchTerm, status: filtered });
    }, [fetchPatners, searchTerm, filtered]);

    useEffect(() => {
        fetchData(0, pagination?.size || 8);
    }, [fetchData, filtered, pagination?.size]);

    const handlePageChange = (newPage) => {
        fetchData(newPage, pagination?.size || 8);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchData(0, pagination?.size || 8);
    };

    const handleFilterChange = (e) => {
        setFiltered(e.target.value);
    };

    const openModal = (patnerId) => {
        setSelectedPatnerId(patnerId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPatnerId(null);
        setIsModalOpen(false);
    };

    const handleSuspend = () => {
        // Implementasi suspend function
        // console.log('Suspend seller:', selectedPatnerId);
        closeModal();
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-800';
            case 'INACTIVE':
                return 'bg-gray-100 text-gray-800';
            case 'CANCELED':
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'Aktif';
            case 'INACTIVE':
                return 'Tidak Aktif';
            case 'CANCELED':
            case 'CANCELLED':
                return 'Dibatalkan';
            default:
                return status;
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Penjual</h1>
                    {/*<p className="text-gray-600">welcome to the seller management panel</p>*/}
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari mitra..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </form>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <select
                            value={filtered}
                            onChange={handleFilterChange}
                            className="border rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="ACTIVE">Aktif</option>
                            <option value="INACTIVE">Tidak Aktif</option>
                            <option value="CANCELLED">Dibatalkan</option>
                        </select>
                    </div>
                </div>

                {loading && (
                    <Loading/>
                )}

                {error && (
                    <div className="text-center py-8">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <strong>Error:</strong> {error}
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {patners && patners.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Mitra</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Terdaftar</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {patners.map((patner, index) => (
                                            <tr key={patner.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {((pagination.page || 0) * (pagination.size || 0)) + index + 1}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <div className="flex items-center gap-4">

                                                        {patner.storeImageUrl ? (
                                                            <img src={patner.storeImageUrl} alt={patner.storeName} className="w-10 h-10 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-md font-bold">
                                                                {patner.storeName ? patner.storeName.slice(0, 2).toUpperCase() : 'N/A'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {patner.storeName || 'Nama Toko Tidak Tersedia'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {patner.email || '-'}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {patner.createdAt ? new Date(patner.createdAt).toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(patner.status)}`}>
                                                            {getStatusLabel(patner.status)}
                                                        </span>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {/*<button*/}
                                                        {/*    className="text-gray-400 hover:text-blue-600 p-1"*/}
                                                        {/*    title="Lihat Detail"*/}
                                                        {/*>*/}
                                                        {/*    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                                                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>*/}
                                                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>*/}
                                                        {/*    </svg>*/}
                                                        {/*</button>*/}
                                                        <Link
                                                            to={`/dashboard/seller/detail/${patner.id}`}
                                                            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-900 text-sm font-medium rounded-lg border border-gray-300 transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                            title="Lihat Detail"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                            </svg>
                                                            Detail
                                                        </Link>

                                                        {/*<button*/}
                                                        {/*    className="text-gray-400 hover:text-red-600 p-1"*/}
                                                        {/*    title="Suspend"*/}
                                                        {/*    onClick={() => openModal(patner.id)}*/}
                                                        {/*>*/}
                                                        {/*    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                                                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>*/}
                                                        {/*    </svg>*/}
                                                        {/*</button>*/}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                {pagination && pagination.totalElements > 0 && (
                                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                                        <div className="text-sm text-gray-700 mb-4 md:mb-0">
                                            Menampilkan <span className="font-medium">{((pagination.page || 0) * (pagination.size || 0)) + 1}</span> sampai <span className="font-medium">{Math.min(((pagination.page || 0) + 1) * (pagination.size || 0), (pagination.totalElements || 0))}</span> dari <span className="font-medium">{pagination.totalElements || 0}</span> Entri
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePageChange((pagination.page || 0) - 1)}
                                                disabled={(pagination.page || 0) === 0}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                                </svg>
                                                Sebelumnya
                                            </button>
                                            <span className="px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg border">
                                                Halaman {(pagination.page || 0) + 1} dari {pagination.totalPages || 1}
                                            </span>
                                            <button
                                                onClick={() => handlePageChange((pagination.page || 0) + 1)}
                                                disabled={!(pagination.totalPages) || ((pagination.page || 0) + 1) >= (pagination.totalPages || 0)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 disabled:hover:shadow-sm"
                                            >
                                                Selanjutnya
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                    </svg>
                                    <h3 className="text-lg font-medium mb-2">Tidak ada data mitra</h3>
                                    <p className="text-sm">
                                        {searchTerm || filtered
                                            ? 'Tidak ada mitra yang sesuai dengan filter pencarian.'
                                            : 'Belum ada mitra yang terdaftar.'
                                        }
                                    </p>
                                    {(searchTerm || filtered) && (
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFiltered('');
                                            }}
                                            className="inline-flex items-center mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            Hapus Filter
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Konfirmasi Suspend</h2>
                        <p className="text-gray-600 mb-6">Apakah Anda yakin ingin men-suspend mitra ini?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSuspend}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>
                                </svg>
                                Suspend
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Seller;