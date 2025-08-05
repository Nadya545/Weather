import React from "react";
import "./calendar.scss";
import { generateMonthData } from "../../../helpers/generateMonthData";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedYear,
  setSelectedMonth,
  setMonthData,
  setSelectedDate,
  prevMonth,
  nextMonth,
} from "./calendarSlice";
import { RootState } from "../../../store";
import SvgInCalendar from "../../../icons/SvgInCalendar";
import { years } from "../../../constants/constYears";
import { monthNames } from "../../../constants/constMonthNames";
import { weekDaysNames } from "../../../constants/constWeekDayName";
import WeatherCalendarNow from "./WeatherCalendarNow";
import WeatherCalendar from "./WeatherCalendar";
import useRequest from "../../../hooks/useRequest";

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedYear, selectedMonth, monthData, weatherData } = useSelector(
    (state: RootState) => state.calendar
  );

  const { makeRequest } = useRequest();

  React.useEffect(() => {
    const monthDates = generateMonthData(selectedYear, selectedMonth);
    const serializedData = monthDates.map((week) =>
      week.map((date) => (date ? date.toISOString() : null))
    );
    dispatch(setMonthData(serializedData));
  }, [selectedYear, selectedMonth, dispatch]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(event.target.value);
    dispatch(setSelectedYear(newYear));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(event.target.value);
    dispatch(setSelectedMonth(newMonth));
  };

  const handlePrevMonth = () => {
    dispatch(prevMonth());
  };

  const handleNextMonth = () => {
    dispatch(nextMonth());
  };

  React.useEffect(() => {
    const monthDates = generateMonthData(selectedYear, selectedMonth);
    const serializedData = monthDates.map((week) =>
      week.map((date) => (date ? date.toISOString() : null))
    );
    dispatch(setMonthData(serializedData));
  }, [selectedYear, selectedMonth, dispatch]);

  const handleWeatherCalendarClick = async (dateString: string) => {
    // Используем makeRequest для автоматического управления лоадером
    await makeRequest(async () => {
      const date = new Date(dateString);
      const weatherDay = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch(setSelectedDate(weatherDay.toISOString()));

      // Возвращаю любые данные (можно заменить на реальный API-ответ)
      return { success: true };
    });
  };
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
              {monthData.map((week, weekIndex) => (
                <tr key={weekIndex} className="week">
                  {week.map((dateString, dayIndex) =>
                    dateString ? (
                      <td
                        key={dayIndex}
                        className="day"
                        onClick={() => handleWeatherCalendarClick(dateString)}
                      >
                        {new Date(dateString).getDate()}
                      </td>
                    ) : (
                      <td key={dayIndex}></td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="weather-calendar-info">
          {weatherData.currentConditions ? (
            <WeatherCalendarNow data={weatherData} />
          ) : null}
        </div>
        <div className="weather-calendar-info">
          {!weatherData.currentConditions && weatherData.days ? (
            <WeatherCalendar data={weatherData} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Calendar;
