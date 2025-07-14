import React, { useState } from 'react';

const ImageWithLoading = ({ src, alt, className }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setLoading(false)}
            />
        </div>
    );
};

export default ImageWithLoading;