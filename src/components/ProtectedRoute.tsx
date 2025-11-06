import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  requiredRole: 'patient' | 'doctor';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-brand-background dark:bg-gray-900 text-brand-primary dark:text-white">Loading session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.user_metadata.role;

  // If the user's role does not match the required role for this route...
  if (userRole !== requiredRole) {
    // ...redirect them to the correct dashboard for their actual role.
    if (userRole === 'doctor') {
      return <Navigate to="/doctor" replace />;
    }
    if (userRole === 'patient') {
      return <Navigate to="/dashboard" replace />;
    }
    // If they have no role or an unknown role, send them to the homepage as a fallback.
    return <Navigate to="/" replace />;
  }

  // If the roles match, render the intended component.
  return <Outlet />;
};

export default ProtectedRoute;
