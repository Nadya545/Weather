import React, { useEffect, useRef, useState } from "react";
import { years } from "../../../constants/constYears";
import { YearsContainerProps } from "./typeWeather/typeWeather";
import MyButton from "../../../ui/button/MyButton";

const YearsContainer: React.FC<YearsContainerProps> = ({ onYearChange }) => {
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
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
        <MyButton
          key={year}
          className={`btn-yearsContainer ${
            year === activeYear ? "active" : ""
          }`}
          value={year}
          onClick={() => handleYearClick(year)}
          size="normal"
        >
          {year}
        </MyButton>
      ))}
    </div>
  );
};

export default YearsContainer;
