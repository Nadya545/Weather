import "./App.scss";
import React from "react";
import { useState, useEffect } from "react";
import { loaderEventEmitter } from "./utils/eventEmitter";
import Loader from "./ui/loader/Loader";
import { Outlet } from "react-router-dom";

const App = () => {
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
        <div className="globalLoader">
          <Loader />
        </div>
      )}
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default App;
