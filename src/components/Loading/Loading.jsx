import React from 'react';

const Loading = ({ size = 'md', text = 'Memuat...', variant = 'default' }) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-10 w-10',
        lg: 'h-16 w-16',
        xl: 'h-20 w-20'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    if (variant === 'dots') {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0ms]"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:100ms]"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:200ms]"></div>
                    </div>
                    <p className={`text-green-700 font-medium ${textSizeClasses[size]}`}>
                        {text}
                    </p>
                </div>
            </div>
        );
    }

    if (variant === 'pulse') {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className={`${sizeClasses[size]} bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse`}></div>
                    <p className={`text-green-700 font-medium ${textSizeClasses[size]} animate-pulse`}>
                        {text}
                    </p>
                </div>
            </div>
        );
    }

    if (variant === 'modern') {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        {/* Outer ring */}
                        <div className={`${sizeClasses[size]} border-4 border-green-200 rounded-full animate-spin`}></div>
                        {/* Inner ring */}
                        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin`}></div>
                        {/* Center dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                    <div className="text-center">
                        <p className={`text-green-800 font-semibold ${textSizeClasses[size]}`}>
                            {text}
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                            Harap tunggu sebentar
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-white">
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <div className={`${sizeClasses[size]} border-4 border-green-200 rounded-full animate-spin`}></div>
                            <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-green-500 rounded-full animate-spin`}></div>
                        </div>
                        <div className="text-center">
                            <p className={`text-green-800 font-semibold ${textSizeClasses[size]} mb-1`}>
                                {text}
                            </p>
                            <p className="text-green-600 text-sm">
                                Sedang memproses data...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'minimal') {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-white">
                <div className="flex items-center space-x-3">
                    <div className={`${sizeClasses[size]} border-2 border-green-300 border-t-green-500 rounded-full animate-spin`}></div>
                    <span className={`text-green-600 font-medium ${textSizeClasses[size]}`}>
            {text}
          </span>
                </div>
            </div>
        );
    }

    if (variant === 'skeleton') {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-white">
                <div className="flex flex-col items-center space-y-3">
                    <div className={`${sizeClasses[size]} bg-green-200 rounded-full animate-pulse`}></div>
                    <div className="h-4 bg-green-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-green-200 rounded w-16 animate-pulse"></div>
                </div>
            </div>
        );
    }

    // Default variant - improved version
    return (
        <div className="flex items-center justify-center h-screen w-full bg-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    {/* Main spinner */}
                    <div className={`${sizeClasses[size]} border-4 border-green-200 rounded-full animate-spin`}></div>
                    <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-green-500 rounded-full animate-spin`}></div>

                    {/* Inner glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                <div className="text-center">
                    <p className={`text-green-800 font-medium ${textSizeClasses[size]}`}>
                        {text}
                    </p>
                    <div className="flex justify-center space-x-1 mt-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0ms]"></div>
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:100ms]"></div>
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:200ms]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;