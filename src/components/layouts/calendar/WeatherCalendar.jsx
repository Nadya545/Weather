import React from "react";
const WeatherCalendar = ({ data }) => {
  console.log("Код иконки:", data.days[0].icon);
  return (
    <div className="weatherCalendar">
      <img
        src={`https://weather.visualcrossing.com/img/wn/${data.days[0].icon}@2x.png`}
        alt={data.days[0].description}
      />
      <p>{data.days[0].temp}°C</p>
    </div>
  );
};

export default WeatherCalendar;
