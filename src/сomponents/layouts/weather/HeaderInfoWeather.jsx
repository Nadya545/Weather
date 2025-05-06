import React, { useState, useEffect } from "react";
import { fetchWeatherDataCalendar } from "../../../Api/Api";

const HeaderInfoWeather = ({ weatherParams }) => {
  return (
    <div>
      <div>
        <p>{weatherParams.coordinates.name}</p>
        <p>{weatherParams.date.toISOString().split("T")[0]}</p>
      </div>
    </div>
  );
};

export default HeaderInfoWeather;
