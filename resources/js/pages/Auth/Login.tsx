import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import swal from 'sweetalert2';


export default function Login({ errors }: { errors: Record<string, string> }) {
    const { data, setData, post, processing, errors: formErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/');
    };

    // Tampilkan error global (seperti SweetAlert)
    useEffect(() => {
        if (Object.keys(formErrors).length > 0) {
            const firstError = Object.values(formErrors)[0];
            swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: firstError,
                background: '#ffffff',
                color: '#000000',
            });
        }
    }, [formErrors]);

    return (
        <>
            <Head title="Login" />
            <div className="bg-sky-50 min-h-screen flex items-center justify-center font-sans">
                <div className="w-80 md:w-full max-w-md bg-slate-50 backdrop-blur-lg border border-gray-300/30 shadow-xl rounded-xl p-8 text-gray-500">
                    <div className="flex flex-col items-center">
                        <img 
                            src="/assets/images/#" 
                            alt="Logo" 
                            className="w-48 h-auto mx-auto mb-4"
                        />
                        <p className="text-sm text-gray-900 text-center mb-6">
                            Login to access your account
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        {/* Email */}
                        <div className="mb-6 relative">
                            <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fa-solid fa-envelope text-gray-900"></i>
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="peer shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-8 md:px-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                    autoFocus
                                    placeholder='youremail@gmail.com'
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fa-solid fa-lock text-gray-900"></i>
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="peer shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-8 md:px-10 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                    placeholder='Password'
                                />
                                {/* Toggle password bisa ditambahkan dengan state React */}
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-900">Remember Me</span>
                            </label>
                            <a href="#" className="text-sm text-blue-400 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-20 rounded-lg shadow-md focus:outline-none transform transition duration-200 hover:scale-105 disabled:opacity-75"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}