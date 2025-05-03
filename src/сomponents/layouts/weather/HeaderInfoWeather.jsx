import React, { useState, useEffect } from "react";
import { fetchWeatherDataCalendar } from "../../../Api/Api";

const HeaderInfoWeather = ({ weatherParams }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getWeatherNameCityAndDate() {
      try {
        const response = await fetchWeatherDataCalendar(weatherParams);

        setData(response);
        console.log(response);
        return response;
      } catch (err) {
        console.error(
          "Ошибка при получении данных о погоде по координатам):",
          err
        );
      }
    }
    if (weatherParams && !data) {
      getWeatherNameCityAndDate();
    }
  }, [weatherParams]);

  return (
    <div>
      {data && data.days ? (
        <div>
          <p>{weatherParams.name}</p>
          <p>{weatherParams.date.toISOString().split("T")[0]}</p>
          <p>{data.days[0].datetime}</p>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderInfoWeather;
