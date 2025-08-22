import "./App.scss";
import React from "react";
import { useState, useEffect } from "react";
import { loaderEventEmitter } from "./utils/eventEmitter";
import Loader from "./ui/loader/Loader";
import { Outlet, useLocation, Navigate } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = loaderEventEmitter.subscribe((loading) => {
      setIsLoading(loading);
    });
    return () => unsubscribe();
  }, []);
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  // Если не авторизован, показываем только Auth компонент
  if (!isAuthenticated) {
    if (location.pathname === "/") {
      return (
        <>
          {isLoading && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <Loader />
            </div>
          )}
          <div className="App">
            <Outlet />
          </div>
        </>
      );
    } else {
      return <Navigate to="/" replace />;
    }
  }
  // Если авторизован, показываем защищенные маршруты
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}
      <div className="App">
        <Outlet /> {/* Покажет WeatherForm или другие компоненты */}
      </div>
    </>
  );
}

export default App;
