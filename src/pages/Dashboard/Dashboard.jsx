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
    const [startDate, setStartDate] = useState(''); // New state for start date
    const [endDate, setEndDate] = useState('');     // New state for end date
    const acount =localStorage.getItem("Acount")
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
    console.log("report ",summary)
    const refresh = localStorage.getItem("refresh");

    const fetchDashboardData = useCallback(async () => {
        try {
            // Fetch dashboard statistics
            if (fetchDashboardStats) {
                const stats = await fetchDashboardStats();
                if (stats) {
                    setDashboardStats(stats);
                }
            }

            // Fetch weekly statistics
            if (fetchWeeklyStats) {
                const weekly = await fetchWeeklyStats();
                if (weekly) {
                    setWeeklyStats(weekly);
                }
            }

            // Fetch orders report
            if (fetchOrdersReport) {
                await fetchOrdersReport({}); // You might need to pass parameters like startDate, endDate
            }

            // Fetch sales summary
            if (fetchSalesSummary) {
                await fetchSalesSummary({ startDate, endDate }); // Pass startDate and endDate
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            // Ensure refreshing is set to false after all fetches are complete
            setRefreshing(false);
        }
    }, [fetchDashboardStats, fetchWeeklyStats, fetchOrdersReport, fetchSalesSummary, startDate, endDate]);

    useEffect(() => {
        fetchData(0, pagination?.size || 8);
        fetchDashboardData();

        // Set interval untuk refresh data setiap 10 detik
        const intervalId = setInterval(() => {
            handleRefresh(); // Panggil handleRefresh untuk memperbarui semua data
        }, 1800000); // 1800000 milidetik = 30 menit

        // Cleanup function untuk membersihkan interval saat komponen di-unmount
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const chartLabels = summary?.data;
    const chartData = summary?.data?.totalSalesPerDay || [0, 0, 0, 0, 0, 0, 0];

    return (
        <div className="h-auto p-2 md:p-5">
            {/* Header with refresh button */}
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                {/*<button*/}
                {/*    onClick={handleRefresh}*/}
                {/*    disabled={refreshing}*/}
                {/*    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"*/}
                {/*>*/}
                {/*    <MdRefresh className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />*/}
                {/*    {refreshing ? 'Memperbarui...' : 'Perbarui Data'}*/}
                {/*</button>*/}
            </div>

            {/* Error handling */}
            {error && (
                <div className="mb-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
                <div className="flex bg-white h-28 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-auto">
                        <h2 className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 mb-1">
                            Total Pengguna
                        </h2>
                        <h1 className="font-bold text-[clamp(1rem,2.2vw,1.4rem)]" style={{ color: "#2ECC71" }}>
                            <CountUp
                                from={0}
                                to={report?.data.totalCustomer || 0}
                                separator=","
                                direction="up"
                                className="count-up-text"
                            />
                        </h1>
                    </div>
                    <div className="flex-none flex justify-center items-center">
                        <HiOutlineUserGroup size={40} style={{ color: "#2ECC71" }} />
                    </div>
                </div>

                <div className="flex bg-white h-28 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-auto">
                        <h2 className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 mb-1">
                            Mitra
                        </h2>
                        <h1 className="font-bold text-[clamp(1rem,2.2vw,1.4rem)]" style={{ color: "#3498DB" }}>
                            <CountUp
                                from={0}
                                to={report?.data.totalSeller || 80}
                                separator=","
                                direction="up"
                                className="count-up-text"
                            />
                        </h1>
                    </div>
                    <div className="flex-none flex justify-center items-center">
                        <FaRegHandshake size={40} style={{ color: "#3498DB" }} />
                    </div>
                </div>

                <div className="flex bg-white h-28 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-auto">
                        <h2 className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 mb-1">
                            Transaksi Berhasil
                        </h2>
                        <h1 className="font-bold text-[clamp(1rem,2.2vw,1.4rem)]" style={{ color: "#E74C3C" }}>
                            <CountUp
                                from={0}
                                to={report?.data.totalSuccessTx || 0}
                                separator=","
                                direction="up"
                                className="count-up-text"
                            />
                        </h1>
                    </div>
                    <div className="flex-none flex justify-center items-center">
                        <IoReceiptOutline size={40} style={{ color: "#E74C3C" }} />
                    </div>
                </div>

                <div className="flex bg-white h-28 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex-auto">
                        <h2 className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 mb-1">
                            Total Transaks
                        </h2>
                        <h1 className="font-bold text-[clamp(1rem,2.2vw,1.4rem)]" style={{ color: "#F39C12" }}>
                            Rp <CountUp
                                from={0}
                                to={report?.data.totalSuccessAmount || 0}
                                separator=","
                                direction="up"
                                className="count-up-text"
                            />
                        </h1>
                    </div>
                    <div className="flex-none flex justify-center items-center">
                        <LiaMoneyBillWaveSolid size={40} style={{ color: "#F39C12" }} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-5">
                {/* Chart Section */}
                <div className="flex-[2] bg-white rounded-lg shadow-md p-6 flex flex-col ">
                    {/* Filter Tanggal */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate ? startDate.substring(0, 10) : ''}
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        date.setUTCHours(0, 0, 0, 0);
                                        setStartDate(e.target.value ? date.toISOString() : '');
                                    }}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="endDate">
                                    Tanggal Akhir
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate ? endDate.substring(0, 10) : ''}
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        date.setUTCHours(23, 59, 59, 999);
                                        setEndDate(e.target.value ? date.toISOString() : '');
                                    }}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-end mb-[3px]">
                                <button
                                    onClick={handleResetDates}
                                    className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center justify-center"
                                    title="Reset Tanggal"
                                >
                                    <MdRefresh className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Judul */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Ringkasan</h3>
                    </div>

                    {/* Konten Ringkasan */}
                    <div className="flex-grow w-full overflow-y-auto">
                        {salesSummaryLoading ? (
                            <Loading />
                        ) : salesSummaryError ? (
                            <div className="text-center py-8">
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    <strong>Error:</strong> {salesSummaryError}
                                </div>
                            </div>
                        ) : summary?.data ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-600">Total Customer</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {summary.data.totalCustomer}
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-600">Total Seller</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {summary.data.totalSeller}
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-600">Total Success Transaction</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {summary.data.totalSuccessTx}
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-gray-600">Total Success Amount</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {summary.data.totalSuccessAmount}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Tidak ada data ringkasan penjualan.</p>
                            </div>
                        )}
                    </div>
                </div>



                {/* Partners Verification Queue */}
                <div className="flex-[1] bg-white h-96 rounded-lg shadow-md p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Antrian Verifikasi Mitra</h3>
                        <div className="text-sm text-gray-500">
                            {patners?.length || 0} mitra
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto">
                        {loading ? (
                            <Loading/>
                        ) : patners && patners.length > 0 ? (
                            <ul className="space-y-3">
                                {patners.map((item) => (
                                    <li key={item.id} className="bg-gray-50 p-3 rounded-lg border hover:shadow-md transition-shadow duration-200">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <FaUserCircle size={24} className="text-gray-600 flex-shrink-0" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                                        {item.storeName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
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
                                                className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white text-xs rounded-md transition-colors duration-200 flex-shrink-0"
                                            >
                                                Lihat
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <FaUserCircle size={48} className="mb-3 opacity-50" />
                                <p className="text-sm">Tidak ada mitra yang menunggu verifikasi</p>
                            </div>
                        )}
                    </div>

                    {/* Show more button if there are more items */}
                    {patners && patners.length > 0 && pagination?.hasNext && (
                        <div className="mt-4 pt-3 border-t">
                            <Link
                                to="/dashboard/patner"
                                className="block text-center text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                                Lihat Semua Mitra →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;