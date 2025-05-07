import React, { useState } from "react";
import Calendar from "../calendar/Calendar";
import Coordinates from "./Coordinates";
import { fetchWeatherDataCalendar } from "../../../Api/Api";
import WeatherFormRenderNow from "./WeatherFormRenderNow.jsx";
import WeatherFormRenderCalendar from "./WeatherFormRenderCalendar";
import HeaderInfoWeather from "./HeaderInfoWeather.jsx";
import Loader from "../../../UI/loader/Loader.jsx";

const WeatherForm = () => {
  const [weatherParams, setWeatherParams] = useState({
    date: new Date(),
    coordinates: {
      lon: "38.5",
      lat: "52.6",
      name: "Елец",
    },
  });

  const [renderWeather, setRenderWeather] = useState([]);

  const [loading, setLoading] = useState(false);

  function setLocation(coordinates, name) {
    setWeatherParams((prev) => ({
      ...prev,
      coordinates: coordinates,
      name: name,
    }));
  }

  function setDate(date) {
    setWeatherParams((prev) => ({
      ...prev,
      date: date,
    }));
  }

  async function getWeatherDateCoordinates() {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
  /* function getWeatherDateCoordinatesRender() {
    const weatherDateCoordinates = getWeatherDateCoordinates();
    setRenderWeather(weatherDateCoordinates);
  }*/

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="weather-header-container">
            <HeaderInfoWeather weatherParams={weatherParams} />
          </div>
          <div className="weather-big-container">
            <div className="weather-left-form">
              <Coordinates setLoading={setLoading} setLocation={setLocation} />
              <Calendar setLoading={setLoading} setDate={setDate} />

              <button
                onClick={getWeatherDateCoordinates}
                className="btn-weather-coordinates"
              >
                Получить погоду
              </button>
            </div>
            <div className="weather-right-form">
              <div>
                {renderWeather && renderWeather.currentConditions ? (
                  <WeatherFormRenderNow renderWeather={renderWeather} />
                ) : null}

                {!renderWeather.currentConditions && renderWeather.days ? (
                  <WeatherFormRenderCalendar renderWeather={renderWeather} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};
export default WeatherForm;
