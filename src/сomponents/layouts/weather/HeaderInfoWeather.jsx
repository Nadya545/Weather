import React from "react";

const HeaderInfoWeather = ({ weatherParams }) => {
  return (
    <div>
      <div>
        <div>
          <p>{weatherParams.coordinates.name}</p>
          <p>{weatherParams.date.toISOString().split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfoWeather;
