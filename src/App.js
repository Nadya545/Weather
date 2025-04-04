import "./App.css";
import React from "react";
import WeatherList from "./Components/layouts/Weather/WeatherList";
import { useState } from "react";
import WeatherListWeek from "./Components/layouts/Weather/WeatherListWeek";

function App() {
  const [weather, setWeather] = useState([]);
  const [weatherWeek, setWeatherWeek] = useState([]);
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
