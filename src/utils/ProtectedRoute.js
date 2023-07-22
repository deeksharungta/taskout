import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "./firebase";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
