import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/Contact";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import UserNotifications from "./components/common/UserNotifications";
import ProtectedRoute from "./components/common/ProtectedRoute";


// import student components
import StudentLayout from "./components/dashboard/StudentLayout";
import StudentDashboard from "./components/dashboard/StudentDashboard";

// import ComplaintSection from "./components/student/ComplaintSection";
// import FeedbackSection from "./components/student/FeedbackSection";
// import PaymentSection from "./components/student/PaymentSection";
// import MenuSection from "./components/common/Menu";
// import MarkAttendance from "./components/student/MarkAttendance";


import SubmitComplaint from "./components/student/studentFunctions/SubmitComplaint";
import SubmitFeedback from "./components/student/studentFunctions/GiveFeedback"
import GetAllComplaintsByStudent from "./components/student/studentFunctions/GetAllComplaints";  
import ViewMenu from "./components/management/manageFunctions/menuFunctions/ViewMenu";
import MessPayment from "./components/student/studentFunctions/MessPayment";
import ScanQR from "./components/student/studentFunctions/ScanQR";
import InvoiceHistory from "./components/student/studentFunctions/InvoiceHistory";
import AttendanceHistory from "./components/student/studentFunctions/AttendanceHistory";
// import TrackPayment from "./components/student/studentFunctions/TrackPayment";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AdminLayout from "./components/dashboard/AdminLayout";

import FeedbackAttendanceHub from "./components/common/FeedbackAttendanceHub";
import MenuExpensesHub from "./components/common/MenuExpensesHub";
import PaymentInvoiceHub from "./components/common/PaymentInvoiceHub";
import AdminSalaryHub from "./components/common/AdminSalaryHub";
import AdminComplaintHub from "./components/common/AdminComplaintHub";
import UserManagementHub from "./components/common/UserManagementHub";
import GenerateInvoice from "./components/management/manageFunctions/paymentFunctions/GenerateInvoice";
import AdminInvoiceHistory from "./components/management/manageFunctions/paymentFunctions/AdminInvoiceHistory";

import FeedbackList from "./components/common/FeedbackList";
import MenuItems from "./components/management/manageFunctions/MenuItems";
import CreateMenu from "./components/management/manageFunctions/menuFunctions/CreateMenu";
import UpdateMenu from "./components/management/manageFunctions/menuFunctions/UpdateMenu";
import DeleteMenu from "./components/management/manageFunctions/menuFunctions/DeleteMenu";
import AddExpense from "./components/management/manageFunctions/expenseFunctions/AddExpense";
import ExpenseItems from "./components/management/manageFunctions/ExpenseItems";
import ViewExpenses from "./components/management/manageFunctions/expenseFunctions/ViewExpenses";
import AllComplaints from "./components/management/manageFunctions/complaintFunctions/AllComplaints";
import QRDisplay from "./components/management/manageFunctions/attendance/QRDisplay";
import RemoveStudents from "./components/management/manageFunctions/userManagement/RemoveStudents";
import SendNotification from "./components/management/manageFunctions/notification/SendNotification";
import UpdateStaffInfo from "./components/management/manageFunctions/staffFunctions/UpdateStaffInfo";
import GenerateSalarySlip from "./components/management/manageFunctions/staffFunctions/GenerateSalarySlip";
import ViewSalary from "./components/management/manageFunctions/staffFunctions/ViewSalary";
// import staff components
import StaffDashboard from "./components/dashboard/StaffDashboard";
import StaffLayout from "./components/dashboard/StaffLayout";
import StaffComplaintHub from "./components/common/StaffComplaintHub";
// import SalarySection from "./components/staff/SalarySection";




function App() {

  
  // const token = localStorage.getItem("token");
  // const decoded = jwtDecode(token);
  // const role = decoded.role;
  // const userId = decoded.id;


 

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col w-full h-full">
        <Routes>


          {/* common routes */}

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/create-user" element={<ProtectedRoute allowedRoles={["admin"]}><Signup /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/userNotification" element={<UserNotifications />}/>


          {/* Student Routes */}


          <Route path="/student-dashboard" element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout />
            </ProtectedRoute>
          }>

             {/* Default dashboard */}
            <Route index element={<StudentDashboard />} />
            <Route path="complaint-section" element={<GetAllComplaintsByStudent />}/>
            <Route path="feedback-section" element={<AttendanceHistory />}/>
            <Route path="menu-section" element={<ViewMenu />}/>
            <Route path="notification-section" element={<UserNotifications />}/>
            <Route path="payment-section" element={<InvoiceHistory />}/>
          </Route>

              

          {/* admin routes */}

          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout/>
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="feedback-section" element={<FeedbackAttendanceHub />}/>
            <Route path="menu-section" element={<MenuExpensesHub />}/>
            <Route path="payments-section" element={<PaymentInvoiceHub />}/>
            <Route path="salary-section" element={<AdminSalaryHub />}/>
            <Route path="complaints-section" element={<AdminComplaintHub />}/>
            <Route path="users-section" element={<UserManagementHub />}/>
          </Route>


          {/* staff routes */}

          <Route path="/staff-dashboard" element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffLayout/>
            </ProtectedRoute>
          }>
            <Route index element={<StaffDashboard/>}/>
            <Route path="complaints-section" element={<StaffComplaintHub/>}/>
            <Route path="feedback-section" element={<FeedbackAttendanceHub/>}/>
            <Route path="salary-section" element={<ViewSalary/>}/>
            <Route path="menu-section" element={<ViewMenu/>}/>
          </Route>
          
          <Route path="/view-salary" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><ViewSalary /></ProtectedRoute>} />

          {/* student action routes */}
          <Route path="submit-complaint" element={<ProtectedRoute allowedRoles={["student"]}><SubmitComplaint /></ProtectedRoute>} />
          <Route path="submit-feedback" element={<ProtectedRoute allowedRoles={["student"]}><SubmitFeedback /></ProtectedRoute>} />
          <Route path="view-menu" element={<ProtectedRoute allowedRoles={["student", "admin", "staff"]}><ViewMenu /></ProtectedRoute>} />
          <Route path="complaints" element={<ProtectedRoute allowedRoles={["student"]}><GetAllComplaintsByStudent /></ProtectedRoute>} /> 
          <Route path="/student/make-payment" element={<ProtectedRoute allowedRoles={["student"]}><MessPayment /></ProtectedRoute>} />
          <Route path="/student/invoice-history" element={<ProtectedRoute allowedRoles={["student"]}><InvoiceHistory /></ProtectedRoute>} />
          <Route path="/mark-attendance" element={<ProtectedRoute allowedRoles={["student"]}><ScanQR /></ProtectedRoute>} />

    

          {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} /> */}



          {/* admin action routes */}
          <Route path="/add-menu" element={<ProtectedRoute allowedRoles={["admin"]}><CreateMenu /></ProtectedRoute>} />
          <Route path="/update-menu" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateMenu /></ProtectedRoute>} />
          <Route path="/management/menu/menu-items" element={<ProtectedRoute allowedRoles={["admin"]}><MenuItems /></ProtectedRoute>} />
          <Route path="/delete-menu" element={<ProtectedRoute allowedRoles={["admin"]}><DeleteMenu /></ProtectedRoute>} />
          <Route path="feedback-list" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><FeedbackList /></ProtectedRoute>} />
          <Route path="/add-expense" element={<ProtectedRoute allowedRoles={["admin"]}><AddExpense /></ProtectedRoute>} />
          <Route path="/view-expenses" element={<ProtectedRoute allowedRoles={["admin"]}><ViewExpenses /></ProtectedRoute>} />
          <Route path="/management/expense/expense-items" element={<ProtectedRoute allowedRoles={["admin"]}><ExpenseItems /></ProtectedRoute>} />
          {/* Complaints  */}
          <Route path="all-complaints" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><AllComplaints /></ProtectedRoute>} />
          <Route path="get-attendance-qr" element={<ProtectedRoute allowedRoles={["admin", "staff"]}><QRDisplay /></ProtectedRoute>} />
          <Route path="/remove-students" element={<ProtectedRoute allowedRoles={["admin"]}><RemoveStudents/></ProtectedRoute>}/>
          <Route path="/send-notification" element={<ProtectedRoute allowedRoles={["admin"]}><SendNotification/></ProtectedRoute>}/>
          <Route path="/admin/generate-invoice" element={<ProtectedRoute allowedRoles={["admin"]}><GenerateInvoice /></ProtectedRoute>} />
          <Route path="/admin/invoice-history" element={<ProtectedRoute allowedRoles={["admin"]}><AdminInvoiceHistory /></ProtectedRoute>} />
          <Route path="/admin/update-staff" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateStaffInfo /></ProtectedRoute>} />
          <Route path="/admin/generate-salary" element={<ProtectedRoute allowedRoles={["admin"]}><GenerateSalarySlip /></ProtectedRoute>} />

          
    

        </Routes>
      </div>
    </div>
  );
}

export default App;
