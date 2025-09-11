import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    console.log("🔓 Redirecting to /weather");
    return <Navigate to="/weather" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
