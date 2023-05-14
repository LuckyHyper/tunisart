import React from 'react';
import jwt from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  else {
    const decoded = jwt(token);
    const user = decoded.UserInfo.isAdmin;
    return user;
  }
};

function PrivateRoutes() {
  const isAdmin = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
