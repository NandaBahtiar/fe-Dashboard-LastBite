import React from 'react';
import { FaTools } from 'react-icons/fa';

const Maintenance = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <FaTools className="text-6xl text-yellow-500 mb-6 animate-bounce" />
            <h1 className="text-4xl font-extrabold mb-2">Situs dalam Perbaikan</h1>
            <p className="text-lg text-center max-w-md mb-8">
                Kami sedang melakukan beberapa pemeliharaan. Kami akan segera kembali online!
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm">© 2025 LastBite. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Maintenance;
