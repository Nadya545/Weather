import { useEffect } from "react";
import React from "react";
import { fetchWeatherDataWeek } from "../../Api";
import WeatherDaysInfo from "./WeatherDaysInfo";

const WeatherListWeek = ({ weatherWeek, setWeatherWeek }) => {
  useEffect(() => {
    async function handleFetchWeatherWeek() {
      const data2 = await fetchWeatherDataWeek();
      console.log(data2);
      if (data2) {
        const dailyForecasts = {};

        data2.list.forEach((forecast) => {
          const date3 = new Date(forecast.dt * 1000).toLocaleDateString();
          if (!dailyForecasts[date3]) {
            dailyForecasts[date3] = {
              temp: 0,
              count: 0,
              weather: forecast.weather[0],
              humidity: forecast.main.humidity,
              pressure: forecast.main.pressure,
            };
          }
          dailyForecasts[date3].temp += forecast.main.temp; // Sum temperatures
          dailyForecasts[date3].count += 1;
        });
        const aggregatedData = Object.keys(dailyForecasts).map((date) => ({
          date,
          temp: (
            dailyForecasts[date].temp / dailyForecasts[date].count
          ).toFixed(1), // Average temperature
          weather: dailyForecasts[date].weather,
          humidity: dailyForecasts[date].humidity,
          pressure: dailyForecasts[date].pressure,
        }));

        setWeatherWeek(aggregatedData);
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
