import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import Modal from '../../components/Modal/Modal.jsx';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import useUsers from '../../hooks/useUsers.js';
import Loading from "../../components/Loading/Loading.jsx";

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [statusFilter, setStatusFilter] = useState(''); // Tambah filter status
    const { fetchCustomers } = useUsers();
    const { customers, pagination, status, error } = useSelector((state) => state.customers);
    const loading = status === 'loading';
    const sekarang = new Date();
    console.log("totalElements",pagination)

    const fetchData = useCallback((page = 0, size = 8) => {
        fetchCustomers({ page, size, search: searchTerm, status: statusFilter, role:"ROLE_CUSTOMER" });
    }, [fetchCustomers, searchTerm, statusFilter]);

    useEffect(() => {
        fetchData(0, pagination?.size || 8); // Tambah optional chaining dan default value
    }, [fetchData, searchTerm, statusFilter]);

    const handlePageChange = (newPage) => {
        fetchData(newPage, pagination?.size || 8);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchData(0, pagination?.size || 8); // Reset ke halaman pertama saat search
    };

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleConfirmSuspend = () => {
        if (selectedUser) {
            const action = getUserStatus(selectedUser).status === 'suspended' ? 'membatalkan suspend' : 'suspend';
            // console.log(`${action} user:`, selectedUser.id);
            // Logika untuk suspend/unsuspend pengguna
        }
        handleCloseModal();
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    // Perbaiki logika status
    const getUserStatus = (user) => {
        if (user.suspendedUntil && new Date(user.suspendedUntil) > new Date()) {
            return { status: 'suspended', label: 'Ditangguhkan' };
        }
        // Consider user active if suspendedUntil is null, undefined, or a past date
        return { status: 'active', label: 'Aktif' };
    };

    const getStatusClass = (user) => {
        const userStatus = getUserStatus(user);
        switch (userStatus.status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'suspended':
                return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-8 00';
        }
    };

    return (
  <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">User</h1>
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
                            placeholder="Cari pengguna..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </form>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            className="border rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="ACTIVE">Aktif</option>
                            <option value="INACTIVE">Ditangguhkan</option>
                            {/*<option value="suspended">Ditangguhkan</option>*/}
                        </select>

                        {/*<Link*/}
                        {/*    to="/dashboard/user/create"*/}
                        {/*    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto"*/}
                        {/*>*/}
                        {/*    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>*/}
                        {/*    </svg>*/}
                        {/*    Tambah Pengguna*/}
                        {/*</Link>*/}
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
                        {customers && customers.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengguna</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telepon</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Terdaftar</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {customers.map((user, index) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {(pagination.page * pagination.size) + index + 1}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <div className="flex items-center gap-4">
                                                        {user.profileImageUrl ? (
                                                            <img src={user.profileImageUrl} alt={user.fullName} className="w-10 h-10 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                                {user.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'N/A'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.fullName || 'Nama Tidak Tersedia'}
                                                            </div>
                                                            {user.username && (
                                                                <div className="text-xs text-gray-500">
                                                                    @{user.username}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email || '-'}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {user.phoneNumber || '-'}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user)}`}>
                                                            {getUserStatus(user).label}
                                                        </span>
                                                    {user.suspendedUntil && new Date(user.suspendedUntil) > sekarang && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                             sampai: {new Date(user.suspendedUntil).toLocaleDateString('id-ID')}
                                                        </div>
                                                    )}
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
                                                            to={`/dashboard/user/detail/${user.id}`}
                                                            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-900 text-sm font-medium rounded-lg border border-gray-300 transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                            </svg>
                                                            Detail
                                                        </Link>
                                                        {/*<button*/}
                                                        {/*    className="text-gray-400 hover:text-orange-600 p-1"*/}
                                                        {/*    title={getUserStatus(user).status === 'suspended' ? 'Batalkan Suspend' : 'Suspend User'}*/}
                                                        {/*    onClick={() => handleOpenModal(user)}*/}
                                                        {/*>*/}
                                                        {/*    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                                                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>*/}
                                                        {/*    </svg>*/}
                                                        {/*</button>*/}
                                                        {/*<button*/}
                                                        {/*    className="text-gray-400 hover:text-red-600 p-1"*/}
                                                        {/*    title="Hapus"*/}
                                                        {/*    onClick={() => {*/}
                                                        {/*        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.')) {*/}
                                                        {/*            console.log('Delete user:', user.id);*/}
                                                        {/*        }*/}
                                                        {/*    }}*/}
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
                                            Menampilkan <span className="font-medium">{(pagination.page * pagination.size) + 1}</span> sampai <span className="font-medium">{Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)}</span> dari <span className="font-medium">{pagination.totalElements}</span> Entri
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePageChange(pagination.page - 1)}
                                                disabled={pagination.page === 0}
                                                className="px-4 py-2 border rounded-lg text-gray-600 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Sebelumnya
                                            </button>
                                            <span className="px-3 py-2 text-sm text-gray-600">
                                                Halaman {pagination.page + 1} dari {pagination.totalPages || 1}
                                            </span>
                                            <button
                                                onClick={() => handlePageChange(pagination.page + 1)}
                                                disabled={!pagination.totalPages || pagination.page + 1 >= pagination.totalPages}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                    </svg>
                                    <h3 className="text-lg font-medium mb-2">Tidak ada data pengguna</h3>
                                    <p className="text-sm">
                                        {searchTerm || statusFilter
                                            ? 'Tidak ada pengguna yang sesuai dengan filter pencarian.'
                                            : 'Belum ada pengguna yang terdaftar.'
                                        }
                                    </p>
                                    {(searchTerm || statusFilter) && (
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setStatusFilter('');
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
        <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmSuspend}
                title="Konfirmasi Suspend Pengguna"
            >
                <p>Apakah Anda yakin ingin men-suspend pengguna ini?</p>
            </Modal>
        </div>
    );
};

export default Users;