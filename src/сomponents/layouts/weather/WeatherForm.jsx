import React, { useState } from "react";
import Calendar from "../calendar/Calendar";
import Coordinates from "./Coordinates";
import { fetchWeatherDataCalendar } from "../../../Api/Api";
import WeatherFormRenderNow from "./WeatherFormRenderNow.jsx";
import WeatherFormRenderCalendar from "./WeatherFormRenderCalendar";
import HeaderInfoWeather from "./HeaderInfoWeather.jsx";
import Loader from "../../../UI/loader/Loader.jsx";
import YearsContainer from "./YearsContainer.jsx";
import { initialDate } from "../calendar/Calendar";
import { generateMonthData } from "../calendar/Calendar";
import { initialWeatherParams } from "../../../constants/constants.js";

const WeatherForm = () => {
  const [weatherParams, setWeatherParams] = useState(initialWeatherParams);

  const [renderWeather, setRenderWeather] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [monthData, setMonthData] = useState(initialDate);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

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
  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
    setMonthData(generateMonthData(newYear, selectedMonth));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="the_biggest_container">
          <div className="veryBigContainer">
            <div className="weather-header-container">
              <HeaderInfoWeather weatherParams={weatherParams} />
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
            <div className="weather-big-container">
              <div className="weather-left-form">
                <Coordinates
                  setLoading={setLoading}
                  setLocation={setLocation}
                />
                <Calendar
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  setLoading={setLoading}
                  setDate={setDate}
                  monthData={monthData}
                  setMonthData={setMonthData}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                />

                <button
                  onClick={getWeatherDateCoordinates}
                  className="btn-weather-coordinates"
                >
                  Получить погоду
                </button>
              </div>
            </div>
          </div>

          <YearsContainer onYearChange={handleYearChange} />
        </div>
      )}
    </>
  );
};
export default WeatherForm;
