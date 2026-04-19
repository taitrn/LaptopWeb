import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-5 text-center">Đang tải...</div>;
  }

  if (!user) {
    // If not logged in, send to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If logged in but wrong role, send to home
    return <Navigate to="/" replace />;
  }

  // If all good, render the children (or Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
