import React from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { weatherParamsProps } from "./typeWeather/typeWeather";

const HeaderInfoWeather: React.FC<weatherParamsProps> = ({ weatherParams }) => {
  const { selectedDate } = useSelector((state: RootState) => state.calendar);

  return (
    <div>
      <div>
        <div className="nameCity">
          <h1>{weatherParams.coordinates.name}</h1>
        </div>
        <div className="date">
          <h2>
            {selectedDate // Используем дату из Redux если есть
              ? new Date(selectedDate).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })
              : weatherParams.date.toLocaleDateString("ru-RU", {
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
