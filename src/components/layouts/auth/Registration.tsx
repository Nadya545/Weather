import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../../ui/button/Button";
import "./auth.scss";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
    confirmPassword: "",
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
      confirmPassword: "",
    };
    if (!formData.login.trim()) {
      newErrors.login = "Логин обязателен!";
      isValid = false;
    } else if (formData.login.length < 3) {
      newErrors.login = "Логин должен содержать минимум 3 символа!";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Пароль обязателен!";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов!";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают...";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user: any) => user.login === formData.login);

    if (userExists) {
      setErrors((prev) => ({
        ...prev,
        login: "Пользователь с таким логином уже существует!",
      }));
      return;
    }

    users.push({
      login: formData.login,
      passwort: formData.password,
    });

    localStorage.setItem("users", JSON.stringify(users)); // сохраняю обновленный список пользователей
    localStorage.setItem("isAuthenticated", "true"); //  помечаю, что пользователь авторизован
    localStorage.setItem("currentUser", formData.login); //  сохраняю логин текущего пользователя
    navigate("/weather");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-picture">РЕГИСТРАЦИЯ</div>
        <form className="auth-form" onSubmit={handleRegistration}>
          <h2 className="auth-title">Регистрация</h2>

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

          <div className="form-group">
            <input
              className="input-auth"
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && (
              <span className="error-massage">{errors.confirmPassword}</span>
            )}
          </div>
          <Button className="but-auth-registration" type="submit" size="big">
            Зарегистрироваться
          </Button>

          <p className="auth-link">
            Уже есть аккаунт? <Link to="/authorisation">Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
