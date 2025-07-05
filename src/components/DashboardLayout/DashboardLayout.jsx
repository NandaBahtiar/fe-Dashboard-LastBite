import React, {useEffect, useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import { GoHome, GoGear, GoSignOut } from "react-icons/go";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoReceiptOutline } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa";


import { IoMdNotificationsOutline } from "react-icons/io";
import useAuthCombined from "../../hooks/useAuth.js";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuthCombined();
 //log jwtToken
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            console.log('JWT Token:', jwtToken);
        }
    },[])
    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Mobile sidebar toggle button */}
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-60 bg-white shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
                <div className="flex items-center justify-center h-14 shadow-md bg-[#2ECC71]">
                    <h1 className="text-2xl font-bold text-primary">LastBite<span className="text-secondary">.</span></h1>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink to={"/dashboard"} end className={({isActive}) => `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-[#2ECC71] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                        <GoHome size={20} />
                        <span className="ml-3">Dashboard</span>
                    </NavLink>

                    <NavLink to={"/dashboard/users"} className={({isActive}) => `flex items-center px-4 py-2 rounded-lg transition-colors ${(isActive || location.pathname.startsWith('/dashboard/user/detail')) ? 'bg-[#2ECC71] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                        <HiMiniUserGroup size={20} />
                        <span className="ml-3">Manajemen User</span>
                    </NavLink>
                    <NavLink to={"/dashboard/patners"} className={({isActive}) => `flex items-center px-4 py-2 rounded-lg transition-colors ${(isActive || location.pathname.startsWith('/dashboard/seller/detail')) ? 'bg-[#2ECC71] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                        <FaRegHandshake size={20} />
                        <span className="ml-3">Manajemen Seller</span>
                    </NavLink>
                    <NavLink to={"/dashboard/transactions"} className={({isActive}) => `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-[#2ECC71] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                        <IoReceiptOutline size={20} />
                        <span className="ml-3">Riwayat Transaksi</span>
                    </NavLink>
                    <NavLink to={"/dashboard/settings"} className={({isActive}) => `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-[#2ECC71] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                        <GoGear size={20} />
                        <span className="ml-3">Pengaturan</span>
                    </NavLink>
                </nav>
                <div className="px-4 py-6 mt-auto">
                    {/*<button onClick={logout} className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg focus:outline-none">*/}
                    {/*    <GoSignOut size={20} />*/}
                    {/*    <span className="ml-3">Logout</span>*/}
                    {/*</button>*/}
                </div>
            </aside>

            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
                <header className="flex items-center justify-between py-2 px-6 bg-white border-b sticky top-0 z-20 shadow-xl">
                    <div className="flex items-center">
                        <div className={`md:hidden ${!sidebarOpen ? 'block' : 'hidden'}`}>
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 focus:outline-none">
                                show

                            </button>
                        </div>

                    </div>
                    <div className="flex items-center space-x-4">
                        <IoMdNotificationsOutline size={24} className="text-gray-600" />
                        <div className="flex items-center">
                            <img className="w-10 h-10 rounded-full object-cover" src={`https://placehold.co/100x100/2ECC71/FFFFFF?text=${localStorage.getItem("Acount")?.charAt(0)}`} alt="[Gambar Avatar Admin]"/>
                            <div className="ml-2 hidden sm:block">
                                <p className="font-semibold text-sm">{localStorage.getItem("Acount")}</p>
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