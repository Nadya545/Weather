import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../../ui/button/Button";
import "./auth.scss";
import { api } from "../../../services/api";

const Authorisation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      login: "",
      password: "",
    };
    if (!formData.login.trim()) {
      newErrors.login = "Введите логин";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Введите пароль";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleAuthorisation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const user = await api.login(formData.login, formData.password);

      if (!user) {
        setErrors({
          login: "Неверный логин или пароль",
          password: "Неверный логин или пароль",
        });
        return;
      }

      localStorage.setItem("isAuthenticated", "true"); //  помечаю, что пользователь авторизован
      localStorage.setItem("currentUser", formData.login); //  сохраняю логин текущего пользователя
      localStorage.setItem("userId", user.id?.toString() || "");
      navigate("/weather");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      setErrors({
        login: "Ошибка сервера",
        password: "Попробуйте позже",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-picture">АВТОРИЗАЦИЯ</div>
        <form className="auth-form" onSubmit={handleAuthorisation}>
          <h2 className="auth-title">Авторизация</h2>

          <div className="form-group">
            <input
              className="input-auth"
              type="text"
              name="login"
              placeholder="Логин"
              value={formData.login}
              onChange={handleInputChange}
              required
            />
            {errors.login && (
              <span className="error-massage">{errors.login}</span>
            )}
          </div>
          <div className="form-group">
            <input
              className="input-auth"
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && (
              <span className="error-massage">{errors.password}</span>
            )}
          </div>
          <Button className="but-auth" type="submit" size="big">
            Войти
          </Button>
          <p className="auth-link">
            Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Authorisation;
