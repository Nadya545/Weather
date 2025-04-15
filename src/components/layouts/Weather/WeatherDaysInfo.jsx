import React from "react";

function WeatherDaysInfo({ weatherWeek = [] }) {
  return (
    <div className="weather-details">
      {!!weatherWeek.length ? (
        weatherWeek.map((day, index) => (
          <div key={index}>
            <h4>День {day.date}</h4>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
              alt={day.weather.description}
            />
            <p>{day.weather.description}</p>
            <p>{day.temp}°C</p>
          </div>
        ))
      ) : (
        <h1>Данные о погоде недоступны</h1>
      )}
    </div>
  );
}

export default WeatherDaysInfo;
