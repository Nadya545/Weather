import React, { JSX } from "react";
import PartlyCloudIcon from "../../../icons/PartlyCloudIcon";
import CloudyIcon from "../../../icons/CloudyIcon";
import ClearIcon from "../../../icons/ClearIcon";
import RainIcon from "../../../icons/RainIcon";
interface WeatherData {
  currentConditions?: {
    // опишите структуру текущих условий
    temp: number;
    icon: string;
    conditions: string;
  };
  days?: Array<{
    // опишите структуру данных для дней
    temp: number;
    icon: string;
    description: string;
  }>;
}
interface RenderWeatherProps {
  renderWeather: WeatherData;
}

type weatherIconsKey =
  | "partly-cloudy-day"
  | "cloudy-day"
  | "clear-day"
  | "rain"
  | "cloudy"
  | "clear"
  | "partly-cloudy";

const weatherIcons: Record<weatherIconsKey, JSX.Element> = {
  "partly-cloudy-day": <PartlyCloudIcon />,
  "cloudy-day": <CloudyIcon />,
  "clear-day": <ClearIcon />,
  rain: <RainIcon />,
  cloudy: <CloudyIcon />,
  clear: <ClearIcon />,
  "partly-cloudy": <PartlyCloudIcon />,
};

const WeatherFormRenderCalendar: React.FC<RenderWeatherProps> = ({
  renderWeather,
}) => {
  if (!renderWeather?.days) {
    return null; // Возвращаем null, если нет текущих условий
  }
  const iconComponent =
    weatherIcons[renderWeather.days[0].icon as weatherIconsKey];
  return (
    <div>
      {iconComponent}
      <p>{renderWeather.days[0].description}</p>
      <p>{renderWeather.days[0].temp}°C</p>
    </div>
  );
};

export default WeatherFormRenderCalendar;
