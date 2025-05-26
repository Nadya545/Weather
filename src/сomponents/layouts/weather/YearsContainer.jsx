import React from "react";
import { years } from "../../../constants/constants";

const YearsContainer = ({ selectedYear, setSelectedYear }) => {
  return (
    <div className="yearsContainer">
      {years.map((year) => (
        <button
          key={year}
          className="btn-yearsContainer"
          onClick={() => setSelectedYear(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearsContainer;
