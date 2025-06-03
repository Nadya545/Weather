import React, { useEffect, useRef, useState } from "react";
import { years } from "../../../constants/constants";

const YearsContainer = ({ onYearChange }) => {
  const [activeYear, setActiveYear] = useState(2025);
  const containerRef = useRef(null);

  const getOrderedYears = (centerYear) => {
    const centerIndex = years.indexOf(centerYear);
    const result = [...years];

    // Перемещаем активный год в центральную позицию (индекс 2)
    if (centerIndex !== 4) {
      const [movedYear] = result.splice(centerIndex, 1);
      result.splice(4, 0, movedYear);
    }

    return result;
  };

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeBtn = container.querySelector(".btn-yearsContainer.active");
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeYear]);

  function handleYearClick(year) {
    setActiveYear(year);
    onYearChange(year);
  }
  return (
    <div className="yearsContainer" ref={containerRef}>
      {getOrderedYears(activeYear).map((year) => (
        <button
          key={year}
          className={`btn-yearsContainer ${
            year === activeYear ? "active" : ""
          }`}
          value={year}
          onClick={() => handleYearClick(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearsContainer;
