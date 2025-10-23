import React from "react";
import MainAdmin from "@/Layouts/MainAdmin";
import { Head } from "@inertiajs/react";

const AdminIndex: React.FC = () => {
    return (
        <>
            <Head title="Admin Dashboard" />
            <MainAdmin>
                <h2 className="text-xl font-bold">Welcome to the Admin Dashboard</h2>
            </MainAdmin>
        </>
    );
};

export default AdminIndex;
