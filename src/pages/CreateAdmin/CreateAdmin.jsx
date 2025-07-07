import React, { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import Swal from 'sweetalert2';

const CreateAdmin = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    const { createAdmin } = useAdmin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminData = { username, fullName, email, password, phoneNumber, profileImageUrl };
        try {
            await createAdmin(adminData);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Admin baru berhasil didaftarkan.',
                showConfirmButton: false,
                timer: 1500
            });
            setUsername('');
            setFullName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setProfileImageUrl('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.message || 'Terjadi kesalahan saat mendaftarkan admin.',
            });
        }
    };

    return (
        <div className=" bg-gradient-to-br  flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-green-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-700">Daftar Admin Baru</h2>
                    <p className="mt-2 text-sm text-gray-500">Isi form berikut untuk menambahkan admin</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="Nama Lengkap"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="Kata Sandi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="08xxxxxxxxxx"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700">URL Gambar Profil (opsional)</label>
                        <input
                            id="profileImageUrl"
                            name="profileImageUrl"
                            type="url"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="https://example.com/profile.jpg"
                            value={profileImageUrl}
                            onChange={(e) => setProfileImageUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        >
                            Daftar Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAdmin;
