import React from "react";
import { weatherParamsProps } from "./typeWeather/typeWeather";
const HeaderInfoWeather: React.FC<weatherParamsProps> = ({ weatherParams }) => {
  return (
    <div>
      <div>
        <div className="nameCity">
          <h1>{weatherParams.coordinates.name}</h1>
        </div>
        <div className="date">
          <h2>
            {weatherParams.date.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
            })}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfoWeather;
