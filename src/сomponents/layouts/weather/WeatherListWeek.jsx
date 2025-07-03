import { useEffect } from "react";
import React from "react";
import { fetchWeatherDataWeek } from "../../../Api/Api";
import WeatherDaysInfo from "./WeatherDaysInfo";
import { aggregatWeatherData } from "../../../helpers/AggregateData";

function WeatherListWeek({ weatherWeek, setWeatherWeek }) {
  useEffect(() => {
    async function handleFetchWeatherWeek() {
      const weeklyWeatherData = await fetchWeatherDataWeek();
      console.log(weeklyWeatherData);

      if (weeklyWeatherData) {
        const aggregateData = aggregatWeatherData(weeklyWeatherData);
        setWeatherWeek(aggregateData);
      }
    }
    handleFetchWeatherWeek();
  }, []);

  return (
    <div className="weather-week">
      <div className="weather-week-title">
        <h1>Погода в Ельце на 5 дней</h1>
      </div>
      <WeatherDaysInfo weatherWeek={weatherWeek} />
    </div>
  );
}

export default WeatherListWeek;
