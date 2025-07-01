import React from "react";
import { weatherIcons } from "./Calendar";
interface WeatherData {
  days?: {
    icon: keyof typeof weatherIcons;
    description: string;
    temp: number;
  }[];
}
interface WeatherCalendarProps {
  data: WeatherData;
}

const WeatherCalendar: React.FC<WeatherCalendarProps> = ({ data }) => {
  if (!data.days || data.days.length === 0) {
    return <div className="weatherCalendar">Нет данных о погоде</div>;
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
