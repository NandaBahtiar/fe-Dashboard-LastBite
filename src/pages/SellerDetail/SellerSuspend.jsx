import React from 'react';
import { FaTimesCircle, FaCalendarAlt, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SellerSuspend = ({ user, updateSeller }) => {
    if (!user) {
        return <div>No seller data available.</div>;
    }

    const suspendedUntilDate = user.suspendedUntil ? new Date(user.suspendedUntil).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    const dateNow = new Date();
     const isoDateString = dateNow.toISOString();
    const handleActivateClick = () => {
        Swal.fire({
            title: 'Aktifkan Penjual',
            text: "Anda yakin ingin mengaktifkan kembali penjual ini?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Aktifkan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                updateSeller({ id: user.id, status: "true", suspendedUntil: isoDateString, suspendedReason: "null" });
                Swal.fire(
                    'Diaktifkan!',
                    'Penjual telah diaktifkan kembali.',
                    'success'
                );
            }
        });
    };
    console.log("user",user)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Detail Penjual</h1>
                        <span className="bg-red-100 text-red-800 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                            <FaTimesCircle className="w-4 h-4 mr-2" />
                            Ditangguhkan
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Status Section */}
                    <div className="bg-orange-50 border-b border-orange-100 p-8 text-center">
                        <FaTimesCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Penjual Ditangguhkan</h2>
                        <p className="text-gray-600">
                            Akun penjual <span className="font-semibold text-gray-900">{user.storeName}</span> telah ditangguhkan.
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Store Image and Suspension Info */}
                            <div className="space-y-6">
                                {user.storeImageUrl && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <FaInfoCircle className="w-5 h-5 mr-3 text-gray-400" />
                                            Gambar Toko
                                        </h3>
                                        <div className="flex justify-center">
                                            <img
                                                src={user.storeImageUrl}
                                                alt="Store Image"
                                                className="w-48 h-48 object-cover rounded-lg shadow-md border border-gray-200"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Suspension Details */}
                                <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Detail Penangguhan</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <FaCalendarAlt className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Ditangguhkan Hingga</p>
                                                <p className="text-gray-700 font-medium">{suspendedUntilDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Alasan Penangguhan</p>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {user.suspendedReason || 'Tidak ada alasan yang diberikan.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Seller Information */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Informasi Penjual</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Email</p>
                                                <p className="text-gray-700">{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Nomor Telepon</p>
                                                <p className="text-gray-700">{user.phoneNumber}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Alamat</p>
                                                <p className="text-gray-700">{user.address}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Deskripsi Toko</p>
                                                <p className="text-gray-700">{user.storeDescription || 'Tidak ada deskripsi.'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Dibuat Pada</p>
                                                <p className="text-gray-700">{new Date(user.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaInfoCircle className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-1">Diperbarui Pada</p>
                                                <p className="text-gray-700">{new Date(user.updatedAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex justify-center">
                                <button
                                    onClick={handleActivateClick}
                                    className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition-colors flex items-center font-medium shadow-sm"
                                >
                                    <FaCheckCircle className="w-5 h-5 mr-2" />
                                    Aktifkan Penjual
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSuspend;