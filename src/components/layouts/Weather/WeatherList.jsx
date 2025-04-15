import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "../../../helpers/Api";
import Button from "../../UI/button/Button";
import WeatherOneDayInfo from "./WeatherOneDayInfo";

function WeatherList({ weatherData, setWeather }) {
  const [error, setError] = useState(null);
  const [btnClick, setBtnClick] = useState(true);
  async function handleFetchWeather() {
    try {
      const data = await fetchWeatherData();
      setWeather(data);
      console.log(data);
      setBtnClick(false); //- кнопка нажата при запросе данных ,когда нажимаешь узнать вызывается эта функция
    } catch (err) {
      console.error("Ошибка при получении данных о погоде:", err);
      setError("Не удалось загрузить данные о погоде.");
    }
  }

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <div className="weather">
      <div className="weather-content-now">
        <h1 className="title-now">Погода в Ельце сейчас</h1> <br />
        {btnClick && <Button onClick={handleFetchWeather}>узнать</Button>}{" "}
        <br />
        {error && <h1>{error}</h1>}
        {weatherData && weatherData.weather && weatherData.main ? (
          <WeatherOneDayInfo weather={weatherData} />
        ) : null}
      </div>
    </div>
  );
}

export default WeatherList;
