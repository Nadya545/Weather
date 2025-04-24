import "./App.css";
import React from "react";
import WeatherList from "./сomponents/layouts/weather/WeatherList";
import { useState } from "react";
import WeatherListWeek from "./сomponents/layouts/weather/WeatherListWeek";
import Calendar from "./сomponents/layouts/calendar/Calendar";
import Coordinates from "./сomponents/layouts/weather/Coordinates";

function App() {
  const [weather, setWeather] = useState([]);
  const [weatherWeek, setWeatherWeek] = useState([]);
  {
    /*const getWeatherForDate = async (date) => {
    const weatherData = await fetchWeatherDataCalendar(date);
    setWeather(weatherData); // Обновляем состояние погоды
  };*/
  }
  return (
    <div className="App">
      <WeatherList weatherData={weather} setWeather={setWeather} />

      <Coordinates />

      <WeatherListWeek
        weatherWeek={weatherWeek}
        setWeatherWeek={setWeatherWeek}
      />
    </div>
  );
}

export default App;
