import React from "react";
export interface weatherParamsProps {
  weatherParams: {
    date: Date;
    coordinates: {
      lon: string;
      lat: string;
      name: string;
    };
  };
}
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
