import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const userLoggedInInfo = localStorage.getItem("isLoggedIn");
  if (!userLoggedInInfo) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
