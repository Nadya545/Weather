import React from "react";
import "./calendar.css";
import { useState } from "react";
import { fetchWeatherDataCalendar } from "../../../Api/Api";
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

function Calendar() {
  const [monthData, setMonthData] = useState([initialDate]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState({}); //для отрисовки погоды календаря

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
    console.log("Дата, на которую нажали:", date);
    if (date instanceof Date) {
      try {
        const weatherDay = new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) // создаю обьект дата с учетом часового пояса и времени
        );
        const weather = await fetchWeatherDataCalendar(weatherDay);
        console.log(weather);
        setData(weather);
      } catch (err) {
        console.error("Ошибка при получении данных о погоде", err);
      }
    }
  }

  return (
    <>
      <div className="container-weather-calendar">
        <div className="calendar">
          <header>
            <button onClick={handlePrevMonth}>{"<"}</button>

            <select onChange={handleMonthChange} value={selectedMonth}>
              {monthNames.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select onChange={handleYearChange} value={selectedYear}>
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
