import React from "react";
import "./calendar.css";
import { useState } from "react";
import WeatherCalendarNow from "./WeatherCalendarNow";
import { monthNames, years, weekDaysNames } from "../../../constants/constants";
import WeatherCalendar from "./WeatherCalendar";
import PartlyCloudIcon from "../../../icons/PartlyCloudIcon";
import CloudyIcon from "../../../icons/CloudyIcon";
import ClearIcon from "../../../icons/ClearIcon";
import RainIcon from "../../../icons/RainIcon";

export const weatherIcons = {
  "partly-cloudy-day": <PartlyCloudIcon />,
  "cloudy-day": <CloudyIcon />,
  "clear-day": <ClearIcon />,
  rain: <RainIcon />,
  cloudy: <CloudyIcon />,
  clear: <ClearIcon />,
  "partly-cloudy": <PartlyCloudIcon />,
};

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
const initialDate = generateMonthData(
  new Date().getFullYear(),
  new Date().getMonth() + 1
);

function Calendar({ setDate, setLoading, selectedYear, setSelectedYear }) {
  const [setMonthData] = useState([initialDate]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [data] = useState({}); //для отрисовки погоды к

  function handleYearChange(event) {
    const newYear = Number(event.target.value);
    setSelectedYear(newYear);
  }

  function handleMonthChange(event) {
    const newMonth = Number(event.target.value);
    setSelectedMonth(newMonth);
  }
  function handlePrevMonth() {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    setMonthData(generateMonthData(selectedYear, selectedMonth));
  }

  function handleNextMonth() {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    setMonthData(generateMonthData(selectedYear, selectedMonth));
  }

  async function handleWeatherCalendarClick(date) {
    setLoading(true);

    const weatherDay = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) // создаю обьект дата с учетом часового пояса и времени
    );

    setTimeout(() => {
      setDate(weatherDay);
      console.log(weatherDay);
      setLoading(false);
    }, 2000);
  } // просто запоминаю дату в календаре при нажатии на число и передаю в стейт c помощью setDate

  return (
    <>
      <div className="container-weather-calendar">
        <div className="calendar">
          <header>
            <button className="btn-select" onClick={handlePrevMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6v12z" />
              </svg>
            </button>

            <select
              className="select-month"
              onChange={handleMonthChange}
              value={selectedMonth}
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="select-year"
              onChange={handleYearChange}
              value={selectedYear}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <button className="btn-select" onClick={handleNextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6v12z" />
              </svg>
            </button>
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
              {initialDate.map((week, index) => (
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
        <div className="weather-calendar-info">
          {data.currentConditions ? <WeatherCalendarNow data={data} /> : null}
        </div>
        <div className="weather-calendar-info">
          {!data.currentConditions && data.days ? (
            <WeatherCalendar data={data} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Calendar;
