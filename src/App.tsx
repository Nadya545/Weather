import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { loaderEventEmitter } from "./utils/eventEmitter";
import Loader from "./ui/loader/Loader";
import WeatherForm from "./сomponents/layouts/weather/WeatherForm";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = loaderEventEmitter.subscribe((loading) => {
      setIsLoading(loading);
    });
    return () => unsubscribe();
  }, []);

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
        <WeatherForm />
      </div>
    </>
  );
}

export default App;
