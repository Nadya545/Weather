import React from "react";
const WeatherCalendarNow = ({ data }) => {
  console.log("Код иконки:", data.currentConditions.icon);
  return (
    <div className="weatherCalendar">
      <img
        src={`https://weather.visualcrossing.com/img/wn/${data.currentConditions.icon}@2x.png`}
        alt={data.currentConditions.conditions}
      />
      <p>{data.currentConditions.temp}°C</p>
    </div>
  );
};

export default WeatherCalendarNow;
