import React, { useState } from 'react';
import {Link} from "react-router-dom";

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const usersData = [
        {   id:1,
            avatar: 'https://via.placeholder.com/40',
            name: 'Ahmad',
            email: 'ahmad@example.com',
            role: 'Admin',
            registrationDate: '20 Juni 2025',
            status: 'Aktif',
        },
        {   id:2,
            avatar: 'https://via.placeholder.com/40',
            name: 'Budi',
            email: 'budi@example.com',
            role: 'Users',
            registrationDate: '22 Juni 2025',
            status: 'Tidak Aktif',
        },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Aktif':
                return 'bg-green-100 text-green-800';
            case 'Tidak Aktif':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredUsers = usersData
        .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((user) =>
            roleFilter ? user.role === roleFilter : true
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
                            placeholder="Cari pengguna..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Filter Peran</option>
                            <option value="Admin">Admin</option>
                            <option value="Users">Users</option>
                        </select>
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Tambah Pengguna
                        </button>
                    </div>
                </div>

                {/* Tabel Pengguna */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengguna</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peran</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Terdaftar</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={`${user.name} avatar`} />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.registrationDate}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-4">
                                            <button className="text-gray-400 hover:text-blue-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                            </button>
                                            <Link to={`/dashboard/user/detail/${user.id}`} className="text-gray-400 hover:text-yellow-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L17.5 3.5z"></path></svg>
                                            </Link>
                                            <button className="text-gray-400 hover:text-red-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
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
                        Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">10</span> dari <span className="font-medium">50</span> Entri
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-100 transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 border rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;