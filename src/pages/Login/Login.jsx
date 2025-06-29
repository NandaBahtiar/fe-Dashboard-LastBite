import React from 'react'

const Login = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">

        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#2ECC71]">LastBite<span className="text-[#FF6B35]">.</span></h1>
                <p className="mt-2 text-sm text-gray-600">Selamat datang kembali! Silakan masuk ke akun admin Anda.</p>
            </div>

            <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">Alamat Email</label>
                        <input id="email-address" name="email" type="email" autoComplete="email" required
                               className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#2ECC71] focus:border-[#2ECC71] focus:z-10 sm:text-sm"
                               placeholder="Alamat Email"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Kata Sandi</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required
                               className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#2ECC71] focus:border-[#2ECC71] focus:z-10 sm:text-sm"
                               placeholder="Kata Sandi"/>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                               className="h-4 w-4 text-[#2ECC71] focus:ring-[#2ECC71] border-gray-300 rounded"/>
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Ingat saya
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-[#2ECC71] hover:text-green-600">
                            Lupa kata sandi?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2ECC71] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ECC71]">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <i className="fas fa-lock h-5 w-5 text-green-300 group-hover:text-green-200"></i>
                    </span>
                        Masuk
                    </button>
                </div>
            </form>
        </div>

        </div>
    )
}
export default Login
