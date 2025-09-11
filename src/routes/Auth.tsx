import React from "react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("🔑 Login button clicked");
    localStorage.setItem("isAuthenticated", "true");
    navigate("/weather");
  };

  return (
    <div className="buttonLogin">
      <Button size="big" onClick={handleLogin}>
        Вход
      </Button>
    </div>
  );
};

export default Auth;
