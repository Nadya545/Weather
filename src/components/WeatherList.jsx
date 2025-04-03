import React, { useState } from "react";
import { fetchWeatherData } from "./Api";
import MyButton from "./UI/button/MyButton";
import WeatherOneDayInfo from "./WeatherOneDayInfo";

const WeatherList = ({ weather, setWeather }) => {
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

  return (
    <div className="weather">
      <div className="weather-content-now">
        <h1 className="title-now">Погода в Ельце сейчас</h1> <br />
        {btnClick && (
          <MyButton onClick={handleFetchWeather}>узнать</MyButton>
        )}{" "}
        <br />
        {error && <h1>{error}</h1>}
        {weather && weather.weather && weather.main ? (
          <WeatherOneDayInfo weather={weather} />
        ) : null}
      </div>
    </div>
  );
};

export default WeatherList;
