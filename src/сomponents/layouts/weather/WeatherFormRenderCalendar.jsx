import React from "react";
import { weatherIcons } from "../calendar/Calendar";

const WeatherFormRenderCalendar = ({ renderWeather }) => {
  const iconComponent = weatherIcons[renderWeather.days[0].icon];
  return (
    <div>
      {iconComponent}
      <p>{renderWeather.days[0].description}</p>
      <p>{renderWeather.days[0].temp}°C</p>
    </div>
  );
};

export default WeatherFormRenderCalendar;
