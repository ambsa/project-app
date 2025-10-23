import React from "react";
import { Link, useForm } from '@inertiajs/react';
import swal from 'sweetalert2';

const SidebarUser: React.FC = () => {
    const { post } = useForm();

    const handleLogout = (e: React.FormEvent) => {
            e.preventDefault();
            swal.fire({
                icon: 'warning',
                title: 'Konfirmasi Logout',
                text: 'Apakah anda yakin ingin keluar?',
                showCancelButton: true,
                confirmButtonText: 'Ya, Logout',
                cancelButtonText: 'Batal',
                reverseButtons: true,
                customClass:{
                    container: 'font-sans',
                    popup: 'font-sans',
                    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 ml-5 rounded-md font-sans',
                    cancelButton: 'bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-sans',
                    
                },
                buttonsStyling: false,  
            }). then((result)=>{
                if (result.isConfirmed){
                    post('/logout')
                }
            });
        };

    const menuItems = [
        { name: 'Home', icon: 'fa-solid fa-house', href: '/user/index' },
        { name: 'Manage User', icon: 'fas fa-users', href: '/user/index' },
        { name: 'Attendance', icon: 'fa-solid fa-clipboard-list', href: '/user/index' },
        { name: 'Schedule', icon: 'fas fa-calendar-check', href: '/user/index' },
    ]

    return (
        <div
            id="sidebar"
            className="w-64 h-screen bg-slate-50 flex flex-col shadow-xl fixed lg:relative -left-64 lg:left-0 transition-all duration-300 z-50"
        >
            {/* Header */}
            <div className="p-5 border-b border-gray-700">
                <h1 className="text-xl font-bold flex items-center justify-center">
                    <Link href={'/user'}>
                        Project App
                    </Link>
                </h1>
            </div>

            {/* menu-menu */}
            <nav className="flex-1 overflow-y-auto py-3 px-3">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className="flex items-center py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-300 hover:text-gray-800 group"
                            >
                                <i className={`${item.icon} w-5 text-gray-700 group-hover:text-gray-800`} />
                                <span className="ml-4 font-medium">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Logout
                </button>
            </div>
        </div>

    );
};

export default SidebarUser;