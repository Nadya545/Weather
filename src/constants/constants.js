export const apiKey = process.env.REACT_APP_API_KEY;
export const apiKey2 = process.env.REACT_APP_API_KEY2;
export const location = "52.6237,38.5017";
export const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=52.62&lon=38.50&appid=${apiKey}&units=metric&lang=ru`;
export const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=52.62&lon=38.50&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=ru`;
export const iconSet = "icons1";
export const monthNames = [
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
export const years = [2024, 2025, 2026];

export const weekDaysNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
