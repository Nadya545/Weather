import React from "react";
import { convertPressureToMmHg } from "../../helpers/help";

const WeatherOneDayInfo = ({ weather }) => {
  return (
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>{weather.main.temp}°C</p>
      <p>По ощущениям: {weather.main.feels_like}°C</p>
      <p>Влажность: {weather.main.humidity}%</p>
      <p>Скорость ветра: {weather.wind.speed} м/с</p>
      <p>Давление: {convertPressureToMmHg(weather.main.pressure)} мм рт.ст.</p>
      {weather.rain && weather.rain["1h"] && (
        <p>Дождь: {weather.rain["1h"]} мм/ч</p>
      )}
      {weather.snow && weather.snow["1h"] && (
        <p>Снег: {weather.snow["1h"]} мм/ч</p>
      )}
    </div>
  );
};

export default WeatherOneDayInfo;
