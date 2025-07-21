import React from "react";
import "./calendar.css";
import { useState } from "react";
import WeatherCalendarNow from "./WeatherCalendarNow";
import { monthNames } from "../../../constants/constMonthNames";
import { years } from "../../../constants/constYears";
import { weekDaysNames } from "../../../constants/constWeekDayName";
import WeatherCalendar from "./WeatherCalendar";
import SvgInCalendar from "../../../icons/SvgInCalendar";
import { generateMonthData } from "../../../helpers/generateMonthData";
import { CalendarProps } from "./type/type";

const Calendar: React.FC<CalendarProps> = ({
  selectedYear,
  monthData,
  selectedMonth,
  setDate,
  setLoading,
  setSelectedYear,
  setMonthData,
  setSelectedMonth,
}) => {
  const [data] = useState<{
    currentConditions?: any;
    days?: any;
  }>({});

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const newYear = Number(event.target.value);
    setSelectedYear(newYear);
    setMonthData(generateMonthData(newYear, selectedMonth));
  };

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const newMonth = Number(event.target.value);
    setSelectedMonth(newMonth);
    setMonthData(generateMonthData(selectedYear, newMonth));
  };
  function handlePrevMonth() {
    const newMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
    const newYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setMonthData(generateMonthData(newYear, newMonth));
  }

  function handleNextMonth() {
    const newMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
    const newYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setMonthData(generateMonthData(newYear, newMonth));
  }

  async function handleWeatherCalendarClick(date: Date) {
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
              <SvgInCalendar />
            </button>

            <select
              className="select-month"
              onChange={handleMonthChange}
              value={selectedMonth}
            >
              {monthNames.map((month: string, index: number) => (
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
              {years.map((year: number) => (
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
                {weekDaysNames.map((dayname: string) => (
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
};

export default Calendar;
