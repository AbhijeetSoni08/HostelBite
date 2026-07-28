import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    // For now we check localStorage for the role since we're using that for some things
    // Ideally we'd fetch this from the /api/auth/me endpoint or an AuthContext.
    const role = localStorage.getItem("role");

    if (!role) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role.toLowerCase())) {
        // Role not authorized
        // Redirect to their respective dashboard
        if (role === "student") return <Navigate to="/student-dashboard" replace />;
        if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
        if (role === "staff") return <Navigate to="/staff-dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
