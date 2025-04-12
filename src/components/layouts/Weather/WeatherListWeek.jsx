import { useEffect } from "react";
import React from "react";
import { fetchWeatherDataWeek } from "../../Api";
import WeatherDaysInfo from "./WeatherDaysInfo";
import { aggregatWeatherData } from "../../AggregateData";

const WeatherListWeek = ({ weatherWeek, setWeatherWeek }) => {
  useEffect(() => {
    async function handleFetchWeatherWeek() {
      const data2 = await fetchWeatherDataWeek();
      console.log(data2);

      if (data2) {
        const aggregateData = aggregatWeatherData(data2);
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
};

export default WeatherListWeek;
