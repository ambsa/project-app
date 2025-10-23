import React, { ReactNode } from "react";
import SidebarUser from "@/Partials/SidebarUser";
import { Head } from "@inertiajs/react";

interface MainUserProps {
    children: ReactNode;
    title?: string;
    header?: string;
}

const MainUser: React.FC<MainUserProps> = ({ children, title, header }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <SidebarUser />
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow">
                    <div className="px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        {header && <p className="text-gray-600 mt-1">{header}</p>}
                    </div>

                </header>
                <main className="flex-1 p-6 bg-gray-50">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainUser;

