import React, { useEffect } from "react";
import "./calendar.css";
import { useState } from "react";
import { fetchWeatherDataCalendar } from "../Api";

const Calendar = () => {
  const years = [2024, 2025, 2026];
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const weekDaysNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const [monthData, setMonthData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    function generateMonthData(year, month) {
      const daysInMonth = new Date(year, month, 0).getDate(); // рассчитываю правильное кол-во дней в каждом месяце и году
      const monthData = [];
      let week = [];

      const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); //получаю первый день месяца
      const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

      for (let i = 0; i < offset; i++) {
        week.push(null);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        week.push(date);

        if (date.getDay() === 0 || day === daysInMonth) {
          monthData.push(week);
          week = [];
        }
      }

      while (week.length < 7) week.push(null);
      if (week.length > 0) monthData.push(week);

      return monthData;
    }

    setMonthData(generateMonthData(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  function handleYearAndMonthChange(event) {
    setSelectedYear(Number(event.target.value));
    setSelectedMonth(Number(event.target.value));
  }

  function handlePrevMonth() {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }

  function handleNextMonth() {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }

  async function handleWeatherCalendarClick(date) {
    if (date) {
      const weatherDay = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) // создаю обьект дата с учетом часового пояса и времени
      );
      const weather = await fetchWeatherDataCalendar(weatherDay);
      console.log(weather);
    }
  }

  return (
    <div className="calendar">
      <header>
        <button onClick={handlePrevMonth}>{"<"}</button>

        <select onChange={handleYearAndMonthChange} value={selectedMonth}>
          {monthNames.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <select onChange={handleYearAndMonthChange} value={selectedYear}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button onClick={handleNextMonth}>{">"}</button>
      </header>

      <table>
        <thead>
          <tr>
            {weekDaysNames.map((dayname) => (
              <th key={dayname}>{dayname}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthData.map((week, index) => (
            <tr key={index} className="week">
              {week.map((date, index) =>
                date ? (
                  <td
                    key={index}
                    className="day"
                    onClick={() => handleWeatherCalendarClick(date)}
                  >
                    {date.getDate()}
                  </td>
                ) : (
                  <td key={index}></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
