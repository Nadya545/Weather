import React from "react";
import { weatherIcons } from "./Calendar";
interface WeatherData {
  currentConditions?: {
    icon: keyof typeof weatherIcons;
    conditions: string;
    temp: number;
  };
}
interface WeatherCalendarProps {
  data: WeatherData;
}
const WeatherCalendarNow: React.FC<WeatherCalendarProps> = ({ data }) => {
  if (!data.currentConditions) {
    return <div className="weatherCalendar">Нет данных о погоде</div>;
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
