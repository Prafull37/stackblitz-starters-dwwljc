import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  return !!loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
