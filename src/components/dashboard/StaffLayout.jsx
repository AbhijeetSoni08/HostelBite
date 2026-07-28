import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";

const StaffLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Outlet /> {/* Here the right-side page will render */}
        </div>
    );
};

export default StaffLayout;
