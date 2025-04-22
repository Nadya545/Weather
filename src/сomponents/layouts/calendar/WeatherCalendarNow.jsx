import React from "react";
import { weatherIcons } from "./Calendar";
const WeatherCalendarNow = ({ data }) => {
  console.log("Код иконки:", data.currentConditions.icon);
  const IconComponent = weatherIcons[data.currentConditions.icon];
  return (
    <div className="weatherCalendar">
      {IconComponent}
      <p>{data.currentConditions.conditions}</p>
      <p>{data.currentConditions.temp}°C</p>
    </div>
  );
};

export default WeatherCalendarNow;
