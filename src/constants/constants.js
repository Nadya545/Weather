export const apiKey = process.env.REACT_APP_API_KEY;
export const apiKey2 = process.env.REACT_APP_API_KEY2;

export const urlWeatherData = `https://api.openweathermap.org/data/2.5/weather?lat=52.62&lon=38.50&appid=${apiKey}&units=metric&lang=ru`;
export const urlWeatherDataWeek = `https://api.openweathermap.org/data/2.5/forecast?lat=52.62&lon=38.50&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=ru`;

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
export const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export const weekDaysNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const initialWeatherParams = {
  date: new Date(),
  coordinates: {
    lon: "38.5",
    lat: "52.6",
    name: "Елец",
  },
};
