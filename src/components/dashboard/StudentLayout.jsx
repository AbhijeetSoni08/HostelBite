import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="student" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
