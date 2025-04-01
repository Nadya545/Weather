import { useEffect } from "react";
import React from "react";
import { fetchWeatherDataWeek } from "./Api";
import { convertPressureToMmHg } from "./UI/help/Convert";

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
              weather: forecast.weather[0].description,
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
  }, [setWeatherWeek]);

  return (
    <div className="weather-week">
      <div className="weather-week-title">
        <h1>Погода в Ельце на 5 дней</h1>
      </div>
      <div className="weather-details">
        {weatherWeek.length > 0 ? (
          weatherWeek.map((day, index) => (
            <div key={index}>
              <h4>День {day.date}</h4>
              <p>Температура: {day.temp}°C</p>
              <p>Описание: {day.weather}</p>
              <p>Влажность: {day.humidity}%</p>
              <p>Давление: {convertPressureToMmHg(day.pressure)} мм рт. ст.</p>
            </div>
          ))
        ) : (
          <h1>Данные о погоде недоступны</h1>
        )}
      </div>
    </div>
  );
};

export default WeatherListWeek;
