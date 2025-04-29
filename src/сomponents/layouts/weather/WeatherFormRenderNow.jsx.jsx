import React from "react";
import { weatherIcons } from "../calendar/Calendar";

const WeatherFormRenderNow = ({ renderWeather }) => {
  const iconComponent = weatherIcons[renderWeather.currentConditions.icon];
  return (
    <div>
      {iconComponent}
      <p>{renderWeather.currentConditions.conditions}</p>
      <p>{renderWeather.currentConditions.temp}°C</p>
    </div>
  );
};

export default WeatherFormRenderNow;
