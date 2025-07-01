import React, { useState } from "react";
import Calendar from "../calendar/Calendar";
import CoordinatesComponent from "./CoordinatesComponent";
import { fetchWeatherDataCalendar } from "../../../Api/Api";
import WeatherFormRenderNow from "./WeatherFormRenderNow";
import WeatherFormRenderCalendar from "./WeatherFormRenderCalendar";
import HeaderInfoWeather from "./HeaderInfoWeather";
import Loader from "../../../UI/loader/Loader";
import YearsContainer from "./YearsContainer";
import { initialDate } from "../calendar/Calendar";
import { generateMonthData } from "../calendar/Calendar";
import { initialWeatherParams } from "../../../constants/constants";
interface Coordinates {
  lon: string;
  lat: string;
  name: string;
}
interface WeatherData {
  currentConditions?: {
    // опишите структуру текущих условий
    temp: number;
    icon: string;
    conditions: string;
  };
  days?: Array<{
    // опишите структуру данных для дней
    temp: number;
    icon: string;
    description: string;
  }>;
}

const WeatherForm = () => {
  const [weatherParams, setWeatherParams] = useState(initialWeatherParams);

  const [renderWeather, setRenderWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(false);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [monthData, setMonthData] = useState(initialDate);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  function setLocation(coordinates: Coordinates) {
    setWeatherParams((prev) => ({
      ...prev,
      coordinates: coordinates,
      name: coordinates.name,
    }));
  }

  function setDate(date: Date) {
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
  const handleYearChange = (newYear: number) => {
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

                  {!renderWeather?.currentConditions && renderWeather?.days ? (
                    <WeatherFormRenderCalendar renderWeather={renderWeather} />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="weather-big-container">
              <div className="weather-left-form">
                <CoordinatesComponent
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
