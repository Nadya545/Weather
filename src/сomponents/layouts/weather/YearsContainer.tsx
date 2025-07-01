import React, { useEffect, useRef, useState } from "react";
import { years } from "../../../constants/constants";

interface YearsContainerProps {
  onYearChange: (year: number) => void;
}

const YearsContainer: React.FC<YearsContainerProps> = ({ onYearChange }) => {
  const [activeYear, setActiveYear] = useState(2025);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeBtn = container.querySelector(".btn-yearsContainer.active");
      if (activeBtn) {
        // Получаем позиции элементов для ручного расчета скролла

        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();

        // Вычисляем позицию для скролла
        const scrollPosition =
          btnRect.top -
          containerRect.top -
          containerRect.height / 2 +
          btnRect.height / 2;

        // Применяем плавный скролл
        container.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeYear]);

  function handleYearClick(year: number) {
    setActiveYear(year);
    onYearChange(year);
  }
  return (
    <div className="yearsContainer" ref={containerRef}>
      {years.map((year) => (
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
