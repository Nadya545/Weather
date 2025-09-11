import React, { useEffect, useState } from "react";
import Calendar from "../calendar/Calendar";
import CoordinatesComponent from "./CoordinatesComponent";
import { fetchWeatherDataCalendar } from "../../../api/apiWeather";
import WeatherFormRenderNow from "./WeatherFormRenderNow";
import WeatherFormRenderCalendar from "./WeatherFormRenderCalendar";
import HeaderInfoWeather from "./HeaderInfoWeather";
import YearsContainer from "./YearsContainer";
import { initialDate } from "../calendar/const/const";
import { generateMonthData } from "../../../helpers/generateMonthData";
import { initialWeatherParams } from "../../../constants/constDiffrent";
import useRequest from "../../../hooks/useRequest"; // Импортируем наш хук
import { WeatherData, Coordinates } from "./typeWeather/typeWeather";
import MyButton from "../../../ui/button/Button";
import LogoutButton from "../../../routes/LogooutButton";
import { useNavigate } from "react-router-dom";

const WeatherForm = () => {
  const [weatherParams, setWeatherParams] = useState(initialWeatherParams);
  const {
    state: weatherRequest,
    makeRequest,
    setLoading,
  } = useRequest<WeatherData>();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthData, setMonthData] = useState(initialDate);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  function setLocation(coordinates: Coordinates) {
    setWeatherParams((prev: any) => ({
      ...prev,
      coordinates: coordinates,
      name: coordinates.name,
    }));
  }

  /*function setDate(date: Date) {
    setWeatherParams((prev: any) => ({
      ...prev,
      date: date,
    }));
  }*/

  const getWeatherDateCoordinates = async () => {
    await makeRequest(() => fetchWeatherDataCalendar(weatherParams));
  };

  React.useEffect(() => {
    setMonthData(generateMonthData(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
    setMonthData(generateMonthData(newYear, selectedMonth));
  };

  /*const handleMonthChange = (newMonth: number) => {
    setSelectedMonth(newMonth);
  };*/

  return (
    <>
      {weatherRequest.error && (
        <div className="error">{weatherRequest.error}</div>
      )}

      <div className="wrapper">
        <div className="bigContainer">
          <div className="logoOutButton">
            <LogoutButton />
          </div>

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
              <Calendar />
              <MyButton
                onClick={getWeatherDateCoordinates}
                disabled={
                  !weatherParams.coordinates ||
                  !weatherParams.date ||
                  weatherRequest.loading
                }
                size="big"
              >
                Получить погоду
              </MyButton>
            </div>
          </div>
        </div>

        <YearsContainer onYearChange={handleYearChange} />
      </div>
    </>
  );
};
export default WeatherForm;
