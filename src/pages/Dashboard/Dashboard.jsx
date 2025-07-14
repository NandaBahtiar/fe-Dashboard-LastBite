import React, { useCallback, useEffect, useState } from 'react';

import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegHandshake } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import CountUp from "../../components/Library/CountUp/CountUp.jsx";
import useSeller from "../../hooks/useSeller.js";
import useSalesSummary from "../../hooks/useSalesSummary.js";
import { useSelector } from "react-redux";
import useOrdersReport from "../../hooks/useOrdersReport.js";
import Loading from "../../components/Loading/Loading.jsx";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState('');
    const [dashboardStats, setDashboardStats] = useState({
        totalUsers: 0,
        totalPartners: 0,
        totalTransactions: 0,
        totalRevenue: 0
    });
    const [weeklyStats, setWeeklyStats] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const acount = localStorage.getItem("Acount")
    const { fetchPatners, fetchDashboardStats, fetchWeeklyStats } = useSeller();
    const { patners, pagination, status, error } = useSelector((state) => state.patners);
    const { report, loading: reportLoading, error: reportError, fetchOrdersReport } = useOrdersReport();
    const { summary, loading: salesSummaryLoading, error: salesSummaryError, fetchSalesSummary } = useSalesSummary();
    const loading = status === 'loading';

    const fetchData = useCallback((page = 0, size = 8) => {
        fetchPatners({
            page,
            size,
            status: "INACTIVE"
        });
    }, [fetchPatners, searchTerm, filtered]);

    console.log("report ", summary)
    const refresh = localStorage.getItem("refresh");

    const fetchDashboardData = useCallback(async () => {
        try {
            if (fetchDashboardStats) {
                const stats = await fetchDashboardStats();
                if (stats) {
                    setDashboardStats(stats);
                }
            }

            if (fetchWeeklyStats) {
                const weekly = await fetchWeeklyStats();
                if (weekly) {
                    setWeeklyStats(weekly);
                }
            }

            if (fetchOrdersReport) {
                await fetchOrdersReport({});
            }

            if (fetchSalesSummary) {
                await fetchSalesSummary({ startDate, endDate });
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setRefreshing(false);
        }
    }, [fetchDashboardStats, fetchWeeklyStats, fetchOrdersReport, fetchSalesSummary, startDate, endDate]);

    useEffect(() => {
        fetchData(0, pagination?.size || 8);
        fetchDashboardData();

        const intervalId = setInterval(() => {
            handleRefresh();
        }, 1800000);

        return () => clearInterval(intervalId);
    }, [fetchData, searchTerm, filtered, fetchDashboardData, startDate, endDate]);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await Promise.all([
                fetchData(0, pagination?.size || 8),
                fetchDashboardData()
            ]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleResetDates = () => {
        setStartDate('');
        setEndDate('');
    };



    return (
        <div className="min-h-[80vh] bg-gray-50 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Selamat datang di panel administrator</p>
                </div>
            </div>

            {/* Error handling */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg shadow-sm">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="font-semibold">Terjadi Kesalahan</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
                {/* Summary Section */}
                <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 ">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <h3 className="text-xl font-bold text-gray-800">Data Penjualan</h3>


                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 xl:p-6 space-y-6">
                        {salesSummaryLoading ? (
                            <div className="flex justify-center py-12">
                                <Loading />
                            </div>
                        ) : salesSummaryError ? (
                            <div className="text-center py-12">
                                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                                    <strong>Error:</strong> {salesSummaryError}
                                </div>
                            </div>
                        ) : summary?.data ? (
                            <div className="flex flex-col gap-6">
                                {/* Section: Ringkasan Akun */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-sm font-semibold text-gray-700">Statistik Akun</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-md border border-green-200 hover:shadow transition-shadow">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-green-700 mb-1">Total Customer</p>
                                                    <p className="text-xl font-bold text-green-800">
                                                        {summary.data.totalCustomer?.toLocaleString('id-ID') || 0}
                                                    </p>
                                                </div>
                                                <div className="p-2 bg-green-200 rounded-full">
                                                    <HiOutlineUserGroup className="w-5 h-5 text-green-700" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-md border border-blue-200 hover:shadow transition-shadow">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-blue-700 mb-1">Total Seller</p>
                                                    <p className="text-xl font-bold text-blue-800">
                                                        {summary.data.totalSeller?.toLocaleString('id-ID') || 0}
                                                    </p>
                                                </div>
                                                <div className="p-2 bg-blue-200 rounded-full">
                                                    <FaRegHandshake className="w-5 h-5 text-blue-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Filter Tanggal */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-sm font-semibold text-gray-700">Filter Transaksi</h2>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex flex-col flex-1">
                                            <label className="text-xs font-medium text-gray-600 mb-1" htmlFor="startDate">Tanggal Mulai</label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                value={startDate ? startDate.substring(0, 10) : ''}
                                                onChange={(e) => {
                                                    const date = new Date(e.target.value);
                                                    date.setUTCHours(0, 0, 0, 0);
                                                    setStartDate(e.target.value ? date.toISOString() : '');
                                                }}
                                                className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <label className="text-xs font-medium text-gray-600 mb-1" htmlFor="endDate">Tanggal Akhir</label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                value={endDate ? endDate.substring(0, 10) : ''}
                                                onChange={(e) => {
                                                    const date = new Date(e.target.value);
                                                    date.setUTCHours(23, 59, 59, 999);
                                                    setEndDate(e.target.value ? date.toISOString() : '');
                                                }}
                                                className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            />
                                        </div>

                                        <div className="flex items-end">
                                            <button
                                                onClick={handleResetDates}
                                                className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors text-sm flex items-center justify-center"
                                                title="Reset Tanggal"
                                            >
                                                <MdRefresh className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Ringkasan Transaksi */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-sm font-semibold text-gray-700">Statistik Transaksi</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-md border border-purple-200 hover:shadow transition-shadow">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-purple-700 mb-1">Transaksi Berhasil</p>
                                                    <p className="text-xl font-bold text-purple-800">
                                                        {summary.data.totalSuccessTx?.toLocaleString('id-ID') || 0}
                                                    </p>
                                                </div>
                                                <div className="p-2 bg-purple-200 rounded-full">
                                                    <IoReceiptOutline className="w-5 h-5 text-purple-700" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-md border border-orange-200 hover:shadow transition-shadow">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-orange-700 mb-1">Total Transaksi</p>
                                                    <p className="text-xl font-bold text-orange-800">
                                                        Rp {summary.data.totalSuccessAmount?.toLocaleString('id-ID') || 0}
                                                    </p>
                                                </div>
                                                <div className="p-2 bg-orange-200 rounded-full">
                                                    <LiaMoneyBillWaveSolid className="w-5 h-5 text-orange-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <IoReceiptOutline className="w-16 h-16 mx-auto" />
                                </div>
                                <p className="text-gray-500 text-lg">Tidak ada data ringkasan penjualan</p>
                                <p className="text-gray-400 text-sm mt-2">Data akan muncul setelah ada transaksi</p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Partners Verification Queue */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Antrian Verifikasi Mitra</h3>
                            <div className="flex items-center space-x-2">
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {patners?.length || 0} mitra
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <Loading />
                                </div>
                            ) : patners && patners.length > 0 ? (
                                <div className="space-y-4">
                                    {patners.map((item, index) => (
                                        <div key={item.id} className="group bg-gray-50 hover:bg-green-50 p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                                                        <FaUserCircle className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                                            {item.storeName}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/dashboard/seller/detail/${item.id}`}
                                                    className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white text-xs font-medium rounded-lg transition-colors duration-200 flex-shrink-0 shadow-sm hover:shadow-md"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="p-4 bg-gray-100 rounded-full mb-4">
                                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-lg font-medium">Tidak ada mitra menunggu</p>
                                    <p className="text-gray-400 text-sm mt-2">Semua mitra telah diverifikasi</p>
                                </div>
                            )}
                        </div>

                        {/* Show more button */}
                        {patners && patners.length > 0 && pagination?.hasNext && (
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <Link
                                    to="/dashboard/patner"
                                    className="block w-full text-center py-3 px-4 bg-green-50 text-green-700 hover:bg-green-100 font-medium rounded-lg transition-colors duration-200 border border-green-200 hover:border-green-300"
                                >
                                    Lihat Semua Mitra →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;