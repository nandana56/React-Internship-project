// components/Common/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // If no user logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user's role doesn't match
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Access granted
  return children;
};

export default ProtectedRoute;
