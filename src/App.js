import "./App.css";
import React from "react";
import WeatherList from "./components/WeatherList";
import { useState } from "react";
import WeatherListWeek from "./components/WeatherListWeek";

function App() {
  const [weather, setWeather] = useState({});
  const [weatherWeek, setWeatherWeek] = useState({});
  return (
    <div className="App">
      <WeatherList weather={weather} setWeather={setWeather} />
      <WeatherListWeek
        weatherWeek={weatherWeek}
        setWeatherWeek={setWeatherWeek}
      />
    </div>
  );
}

export default App;
