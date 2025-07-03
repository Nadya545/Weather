import React, { useState } from "react";
import Calendar from "../calendar/Calendar";
import CoordinatesComponent from "./CoordinatesComponent";
import { fetchWeatherDataCalendar } from "../../../api/Api";
import WeatherFormRenderNow from "./WeatherFormRenderNow";
import WeatherFormRenderCalendar from "./WeatherFormRenderCalendar";
import HeaderInfoWeather from "./HeaderInfoWeather";
import Loader from "../../../ui/loader/Loader";
import YearsContainer from "./YearsContainer";
import { initialDate } from "../calendar/Calendar";
import { generateMonthData } from "../calendar/Calendar";
import { initialWeatherParams } from "../../../constants/constants";
import useRequest from "../../../hooks/useRequest"; // Импортируем наш хук

interface Coordinates {
  lon: string;
  lat: string;
  name: string;
}

interface CurrentConditions {
  temp: number;
  icon: string;
  conditions: string;
}

interface DayWeather {
  temp: number;
  icon: string;
  description: string;
}

interface WeatherData {
  currentConditions?: CurrentConditions;
  days?: DayWeather[];
}

const WeatherForm = () => {
  const [weatherParams, setWeatherParams] = useState(initialWeatherParams);
  const {
    state: weatherRequest,
    makeRequest,
    setLoading,
    setError: setRequestError,
  } = useRequest<WeatherData>();

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

  const getWeatherDateCoordinates = async () => {
    if (!weatherParams.coordinates || !weatherParams.date) {
      setRequestError("Пожалуйста, выберите координаты и дату.");
      return;
    }

    await makeRequest(() => fetchWeatherDataCalendar(weatherParams));
  };

  React.useEffect(() => {
    setMonthData(generateMonthData(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
    setMonthData(generateMonthData(newYear, selectedMonth));
  };

  const handleMonthChange = (newMonth: number) => {
    setSelectedMonth(newMonth);
  };

  return (
    <>
      {weatherRequest.loading && <Loader />}
      {weatherRequest.error && (
        <div className="error">{weatherRequest.error}</div>
      )}

      <div className="wrapper">
        <div className="bigContainer">
          <div className="weather-header-container">
            <HeaderInfoWeather weatherParams={weatherParams} />
            <div className="weather-right-form">
              {weatherRequest.data?.currentConditions ? (
                <WeatherFormRenderNow renderWeather={weatherRequest.data} />
              ) : weatherRequest.data?.days ? (
                <WeatherFormRenderCalendar
                  renderWeather={weatherRequest.data}
                />
              ) : null}
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
                selectedMonth={selectedMonth}
                setSelectedMonth={handleMonthChange}
                setLoading={setLoading}
                setDate={setDate}
                monthData={monthData}
                setMonthData={setMonthData}
              />
              <button
                onClick={getWeatherDateCoordinates}
                disabled={
                  !weatherParams.coordinates ||
                  !weatherParams.date ||
                  weatherRequest.loading
                }
                className="btn-weather-coordinates"
              >
                Получить погоду
              </button>
            </div>
          </div>
        </div>

        <YearsContainer onYearChange={handleYearChange} />
      </div>
    </>
  );
};
export default WeatherForm;
