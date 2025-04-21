import React from "react";
import { weatherIcons } from "./Calendar";
const WeatherCalendar = ({ data }) => {
  console.log("Код иконки:", data.days[0].icon);
  const IconComponent = weatherIcons[data.days[0].icon];
  return (
    <div className="weatherCalendar">
      {IconComponent}
      <p>{data.days[0].description}</p>
      <p>{data.days[0].temp}°C</p>
    </div>
  );
};

export default WeatherCalendar;
