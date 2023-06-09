import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ redirectPath = "/sign-in", children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  // if (user.role === "seller") {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
