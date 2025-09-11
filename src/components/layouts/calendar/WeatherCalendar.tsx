import React from "react";
import { weatherIcons } from "./const/const";
import WeatherCalendarUnderfind from "./WeatherCalendarUnderfind";
import { WeatherCalendarProps } from "./type/type";

const WeatherCalendar: React.FC<WeatherCalendarProps> = ({ data }) => {
  if (!data.days || data.days.length === 0) {
    return <WeatherCalendarUnderfind />;
  }

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
