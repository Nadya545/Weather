export const apiKey: string = process.env.REACT_APP_API_KEY || "";
export const apiKey2: string = process.env.REACT_APP_API_KEY2 || "";

export const urlWeatherData: string = `https://api.openweathermap.org/data/2.5/weather?lat=52.62&lon=38.50&appid=${apiKey}&units=metric&lang=ru`;
export const urlWeatherDataWeek: string = `https://api.openweathermap.org/data/2.5/forecast?lat=52.62&lon=38.50&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=ru`;

export const iconSet: string = "icons1";
export const monthNames: string[] = [
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
export const years: number[] = [
  2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
];

export const weekDaysNames: string[] = [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс",
];

export interface InitialWeatherParams {
  date: Date;
  coordinates: {
    lon: string;
    lat: string;
    name: string;
  };
}
export const initialWeatherParams: InitialWeatherParams = {
  date: new Date(),
  coordinates: {
    lon: "38.5",
    lat: "52.6",
    name: "Елец",
  },
};
