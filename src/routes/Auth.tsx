import React from "react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", "true");
    navigate("/weather");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button size="big" onClick={handleLogin}>
        Вход
      </Button>
    </div>
  );
};

export default Auth;
