import React from "react";
import { weatherIcons } from "./const/const";
import WeatherCalendarUnderfind from "./WeatherCalendarUnderfind";
import { WeatherCalendarPropsNow } from "./type/type";

const WeatherCalendarNow: React.FC<WeatherCalendarPropsNow> = ({ data }) => {
  if (!data.currentConditions) {
    return <WeatherCalendarUnderfind />;
  }
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
