import React, { useState } from "react";
import Calendar from "../calendar/Calendar";
import Coordinates from "./Coordinates";
import { fetchWeatherDataCalendar } from "../../../Api/Api";
import WeatherFormRenderNow from "./WeatherFormRenderNow.jsx";
import WeatherFormRenderCalendar from "./WeatherFormRenderCalendar";

const WeatherForm = () => {
  const [weatherParams, setWeatherParams] = useState({
    date: new Date(),
    coordinates: {
      lon: "38.5",
      lat: "52.6",
    },
  });

  const [renderWeather, setRenderWeather] = useState([]);

  function setLocation(coordinates) {
    setWeatherParams((prev) => ({
      ...prev,
      coordinates: coordinates,
    }));
  }

  function setDate(date) {
    setWeatherParams((prev) => ({
      ...prev,
      date: date,
    }));
  }

  async function getWeatherDateCoordinates() {
    try {
      const response = await fetchWeatherDataCalendar(weatherParams);

      setRenderWeather(response);
      console.log(response);
    } catch (err) {
      console.error(
        "Ошибка при получении данных о погоде по координатам):",
        err
      );
      return null;
    }
  }
  /* function getWeatherDateCoordinatesRender() {
    const weatherDateCoordinates = getWeatherDateCoordinates();
    setRenderWeather(weatherDateCoordinates);
  }*/

  return (
    <>
      <div className="weather-big-container">
        <div className="weather-left-form">
          <Coordinates setLocation={setLocation} />
          <Calendar setDate={setDate} />
          <button
            onClick={getWeatherDateCoordinates}
            className="btn-weather-coordinates"
          >
            Получить погоду
          </button>
        </div>
        <div className="weather-right-form">
          {renderWeather && renderWeather.currentConditions ? (
            <WeatherFormRenderNow renderWeather={renderWeather} />
          ) : null}

          {!renderWeather.currentConditions && renderWeather.days ? (
            <WeatherFormRenderCalendar renderWeather={renderWeather} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default WeatherForm;
