import React from "react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/", { replace: true });
  };

  return (
    <Button size="normal" onClick={handleLogout}>
      Выйти
    </Button>
  );
};

export default LogoutButton;
