import React from "react";
import { RenderWeatherProps } from "./typeWeather/typeWeather";
import { weatherIconsKey } from "./typeWeather/typeWeather";
import { weatherIcons } from "../calendar/const/const";

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
