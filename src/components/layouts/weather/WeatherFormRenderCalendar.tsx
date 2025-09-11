import React from "react";
import { RenderWeatherProps } from "./typeWeather/typeWeather";
import { weatherIconsKey } from "./typeWeather/typeWeather";
import { weatherIcons } from "../calendar/const/const";

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
