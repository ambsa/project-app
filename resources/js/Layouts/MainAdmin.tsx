import React, { ReactNode } from 'react';
import SidebarAdmin from '../Partials/SidebarAdmin';
import { Head } from '@inertiajs/react';

interface MainAdminProps {
    children: ReactNode;
    title?: string;
    header?: string;
}

const MainAdmin: React.FC<MainAdminProps> = ({ children, title, header }) => {
    return (
        <div className="bg-gray-100 flex">
            {/* Overlay */}
            <div id="overlay" className="fixed inset-0 opacity-50 hidden lg:hidden">                
            </div>
            <SidebarAdmin />
            <div className='flex-1 flex flex-col'>
                <header className='bg-white shadow-sm'>
                    <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
                        <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
                        {header && <p className='mt-2 text-gray-600'>{header}</p>}
                    </div>
                </header>
                <main className='flex-1 p-6'>
                    <div className='bg-gray-50 shadow-md rounded-lg'>
                        {children}
                    </div>
                </main>
            </div>
        </div>


    );
};

export default MainAdmin;
