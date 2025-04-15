import "./App.css";
import React from "react";
import WeatherList from "./Components/layouts/Weather/WeatherList";
import { useState } from "react";
import WeatherListWeek from "./Components/layouts/Weather/WeatherListWeek";
import { Calendar } from "./Components/layouts/calendar/Calendar";

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
      <Calendar />
      <WeatherListWeek
        weatherWeek={weatherWeek}
        setWeatherWeek={setWeatherWeek}
      />
    </div>
  );
}

export default App;
