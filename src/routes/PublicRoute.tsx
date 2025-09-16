import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const currentUser = localStorage.getItem("currentUser");
  if (isAuthenticated && currentUser) {
    return <Navigate to="/weather" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
