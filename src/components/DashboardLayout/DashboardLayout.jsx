import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Mobile sidebar toggle button */}


            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-center h-20 shadow-md bg-[#2ECC71]">
                    <h1 className="text-2xl font-bold text-primary">LastBite<span className="text-secondary">.</span></h1>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2  ">
                    <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                        <i className="fas fa-tachometer-alt w-6"></i>
                        <span className="ml-3">Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                        <i className="fas fa-users w-6"></i>
                        <span className="ml-3">Manajemen Pengguna</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                        <i className="fas fa-handshake w-6"></i>
                        <span className="ml-3">Manajemen Mitra</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-white bg-primary rounded-lg">
                        <i className="fas fa-receipt w-6"></i>
                        <span className="ml-3">Riwayat Transaksi</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                        <i className="fas fa-cog w-6"></i>
                        <span className="ml-3">Pengaturan</span>
                    </a>
                </nav>
                <div className="px-4 py-6">
                    <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                        <i className="fas fa-sign-out-alt w-6"></i>
                        <span className="ml-3">Logout</span>
                    </a>
                </div>
            </aside>

            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
                <header className="flex items-center justify-between py-5 px-6 bg-white border-b sticky top-0 z-20 shadow-xl">
                    <div className="flex items-center">
                        <div className={`md:hidden ${!sidebarOpen ? 'block' : 'hidden'}`}>
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 focus:outline-none">
                                show

                            </button>
                        </div>

                    </div>
                    <div className="flex items-center space-x-4">
                        <i className="fas fa-bell text-gray-600"></i>
                        <div className="flex items-center">
                            <img className="w-10 h-10 rounded-full object-cover" src="https://placehold.co/100x100/2ECC71/FFFFFF?text=A" alt="[Gambar Avatar Admin]"/>
                            <div className="ml-2 hidden sm:block">
                                <p className="font-semibold text-sm">Admin Utama</p>
                                <p className="text-xs text-gray-500">PT. Enigma Cipta Humanika</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6"  onClick={()=>{
                    if (sidebarOpen) {
                        setSidebarOpen(false);
                    }

                }}>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;