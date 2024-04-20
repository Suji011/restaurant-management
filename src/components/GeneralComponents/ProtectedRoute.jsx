import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return <Navigate to="/login" replace />;
    }
  }

  if (userRole && allowedRoles.includes(userRole)) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};


export default ProtectedRoute