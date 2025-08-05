import React, { useEffect, useRef, useState } from "react";
import { years } from "../../../constants/constYears";
import { YearsContainerProps } from "./typeWeather/typeWeather";
import MyButton from "../../../ui/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSelectedYear, setMonthData } from "../calendar/calendarSlice";
import { generateMonthData } from "../../../helpers/generateMonthData";

const YearsContainer: React.FC<YearsContainerProps> = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedYear, selectedMonth } = useSelector(
    (state: RootState) => state.calendar
  );

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
  }, [selectedYear]);

  function handleYearClick(year: number) {
    dispatch(setSelectedYear(year));

    // Генерируем новые данные месяца при изменении года
    const monthDates = generateMonthData(year, selectedMonth);
    const serializedData = monthDates.map((week) =>
      week.map((date) => (date ? date.toISOString() : null))
    );

    dispatch(setMonthData(serializedData));
  }
  return (
    <div className="years-сontainer" ref={containerRef}>
      {years.map((year) => (
        <MyButton
          key={year}
          className={`btn-years-сontainer ${
            year === selectedYear ? "active" : ""
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
