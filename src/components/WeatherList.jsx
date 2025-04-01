import React, { useEffect } from "react";
import { fetchWeatherData } from "./Api";
import { convertPressureToMmHg } from "./UI/help/Convert";

const WeatherList = ({ weather, setWeather }) => {
  useEffect(() => {
    async function handleFetchWeather() {
      const data = await fetchWeatherData();
      console.log(data);
      setWeather(data);
    }
    handleFetchWeather();
  }, [setWeather]);

  return (
    <div className="weather">
      <div className="weather-content-now">
        {weather && weather.weather && weather.main ? (
          <>
            <h1>Погода в Ельце сейчас:</h1>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Температура: {weather.main.temp}°C</p>
            <p>Температура по ощущениям: {weather.main.feels_like}°C</p>
            <p>Влажность: {weather.main.humidity}%</p>
            <p>Описание: {weather.weather[0].description}</p>
            <p>Скорость ветра: {weather.wind.speed} м/с</p>
            <p>
              Давление: {convertPressureToMmHg(weather.main.pressure)} мм рт.ст.
            </p>
            {weather.rain && weather.rain["1h"] && (
              <p>Дождь: {weather.rain["1h"]} мм/ч</p>
            )}
            {weather.snow && weather.snow["1h"] && (
              <p>Снег: {weather.snow["1h"]} мм/ч</p>
            )}
          </>
        ) : (
          <h1>Данные о погоде недоступны</h1>
        )}
      </div>
    </div>
  );
};

export default WeatherList;
