import React, { useState, useEffect, useCallback } from 'react';
import useWithdrawals from '../../hooks/useWithdrawals';
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading/Loading.jsx";

const Withdraw = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState('PENDING');
    const [currentPageState, setCurrentPageState] = useState(0); // New state for current page
    const { withdrawals, pagination, status, error, fetchWithdrawals } = useWithdrawals();
    const loading = status === 'loading';

    console.log("pagination", pagination);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handlePageChange = (newPage) => {
        setCurrentPageState(newPage); // Update current page state
        fetchData(newPage, pagination?.size || 8);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPageState(0); // Reset page to 0 when search term changes
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPageState(0); // Reset page to 0 when search is submitted
        fetchData(0, pagination?.size || 8);
    };

    const handleFilterChange = (e) => {
        setFiltered(e.target.value);
        setCurrentPageState(0); // Reset page to 0 when filter changes
    };

    const fetchData = useCallback((page = 0, size = 8) => {
        fetchWithdrawals({ page, size, search: searchTerm, status: filtered });
    }, [fetchWithdrawals, searchTerm, filtered]);

    useEffect(() => {
        fetchData(currentPageState, pagination?.size || 8); // Use currentPageState
    }, [fetchData, filtered, searchTerm, currentPageState]); // Add currentPageState to dependencies

    const getStatusClass = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto">
                        {/*<span className="absolute inset-y-0 left-0 flex items-center pl-3">*/}
                        {/*    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>*/}
                        {/*    </svg>*/}
                        {/*</span>*/}
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    placeholder="Cari penarikan..."*/}
                        {/*    value={searchTerm}*/}
                        {/*    onChange={handleSearchChange}*/}
                        {/*    className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"*/}
                        {/*/>*/}
                    </form>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <select
                            value={filtered}
                            onChange={handleFilterChange}
                            className="border rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
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
                        {withdrawals && withdrawals.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Penarikan</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Permintaan</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {withdrawals.map((withdrawal) => (
                                            <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {withdrawal.id}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {formatCurrency(withdrawal.amount)}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(withdrawal.status)}`}>
                                                        {withdrawal.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(withdrawal.requestDate).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                                    <Link to={`/dashboard/withdraw/detail/${withdrawal.id}?sellerId=${withdrawal.sellerId}`} className="text-gray-400 hover:text-yellow-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/*{pagination.totalElements}*/}

                                {pagination && pagination.totalElements > 0 && (
                                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                                        <div className="text-sm text-gray-700 mb-4 md:mb-0">
                                            Menampilkan <span className="font-medium">{(currentPageState * (pagination?.size || 0)) + 1}</span> sampai <span className="font-medium">{Math.min((currentPageState + 1) * (pagination?.size || 0), (pagination?.totalElements || 0))}</span> dari <span className="font-medium">{pagination?.totalElements || 0}</span> Entri
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePageChange(currentPageState - 1)}
                                                disabled={currentPageState === 0}
                                                className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Sebelumnya
                                            </button>
                                            <span className="px-3 py-2 text-sm text-gray-600">
                                                Halaman {currentPageState + 1} dari {pagination?.totalPage || 1}
                                            </span>
                                            <button
                                                onClick={() => handlePageChange(currentPageState + 1)}
                                                disabled={currentPageState + 1 >= (pagination?.totalPage || 1)}
                                                className="px-4 py-2 border rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Selanjutnya
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
                                    <h3 className="text-lg font-medium mb-2">Tidak ada data penarikan</h3>
                                    <p className="text-sm">
                                        {searchTerm || filtered
                                            ? 'Tidak ada penarikan yang sesuai dengan filter pencarian.'
                                            : 'Belum ada penarikan yang terdaftar.'
                                        }
                                    </p>
                                    {(searchTerm || filtered) && (
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFiltered('');
                                            }}
                                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Hapus Filter
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Withdraw;