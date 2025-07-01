import React, { useState } from 'react';
import {Link} from "react-router-dom";

const Patners = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const partnersData = [
        {
            id:1,
            logo: 'https://via.placeholder.com/40',
            name: 'Kopi Bahagia',
            email: 'kontak@kopibahagia.com',
            location: 'Surabaya',
            rating: 4.8,
            joinDate: '24 Juni 2025',
            status: 'Aktif',
        },
        {
            id:2,
            logo: 'https://via.placeholder.com/40',
            name: 'Roti Buana',
            email: 'info@rotibuana.co.id',
            location: 'Jakarta',
            rating: null,
            joinDate: '28 Juni 2025',
            status: 'Menunggu Verifikasi',
        },
        {
            id:3,
            logo: 'https://via.placeholder.com/40',
            name: 'Sate Ceria',
            email: 'support@sateceria.com',
            location: 'Bandung',
            rating: 4.2,
            joinDate: '15 Mei 2025',
            status: 'Ditangguhkan',
        },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Aktif':
                return 'bg-green-100 text-green-800';
            case 'Menunggu Verifikasi':
                return 'bg-yellow-100 text-yellow-800';
            case 'Ditangguhkan':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredPartners = partnersData
        .filter((partner) =>
            partner.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((partner) =>
            statusFilter ? partner.status === statusFilter : true
        );

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-auto">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari mitra..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Filter Status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                            <option value="Ditangguhkan">Ditangguhkan</option>
                        </select>
                        <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Tambah Mitra
                        </button>
                    </div>
                </div>

                {/* Tabel Mitra */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Mitra</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Bergabung</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {partnersData.map((partner, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img className="h-10 w-10 rounded-full object-cover" src={partner.logo} alt={`${partner.name} logo`} />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                                                <div className="text-sm text-gray-500">{partner.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{partner.location}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                                        {partner.rating ? (
                                            <div className="flex items-center gap-1">
                                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                {partner.rating.toFixed(1)}
                                            </div>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{partner.joinDate}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(partner.status)}`}>
                                            {partner.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-4">
                                            <button className="text-gray-400 hover:text-green-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                            </button>
                                            <Link to={`/dashboard/patner/detail/${partner.id}`} className="text-gray-400 hover:text-blue-600" onClick={()=>{

                                            }}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>

                                            </Link>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                    <div className="text-sm text-gray-700 mb-4 md:mb-0">
                        Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">10</span> dari <span className="font-medium">75</span> Entri
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-100 transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 border rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patners;