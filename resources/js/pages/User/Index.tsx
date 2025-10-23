import React from "react";
import MainUser from "@/Layouts/MainUser";
import { Head } from "@inertiajs/react";

const UserIndex: React.FC = () => {
    return (
        <>
            <Head title="User Dashboard" />
            <MainUser>
                <h2 className="text-xl font-bold">Welcome to the User Dashboard</h2>
            </MainUser>
        </>
    );
};

export default UserIndex;
