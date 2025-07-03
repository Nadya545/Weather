import React, { JSX } from "react";
import PartlyCloudIcon from "../../../icons/PartlyCloudIcon";
import CloudyIcon from "../../../icons/CloudyIcon";
import ClearIcon from "../../../icons/ClearIcon";
import RainIcon from "../../../icons/RainIcon";

interface WeatherData {
  currentConditions?: {
    temp: number;
    icon: string;
    conditions: string;
  };
  days?: Array<{
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

const WeatherFormRenderNow: React.FC<RenderWeatherProps> = ({
  renderWeather,
}) => {
  if (!renderWeather?.currentConditions) {
    return null; // Возвращаем null, если нет текущих условий
  }
  const iconComponent =
    weatherIcons[renderWeather.currentConditions.icon as weatherIconsKey];
  return (
    <div>
      {iconComponent}
      <p>{renderWeather.currentConditions.conditions}</p>
      <p>{renderWeather.currentConditions.temp}°C</p>
    </div>
  );
};

export default WeatherFormRenderNow;
