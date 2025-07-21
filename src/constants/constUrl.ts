import { apiKey } from "./constApiKey";
export const urlWeatherData: string = `https://api.openweathermap.org/data/2.5/weather?lat=52.62&lon=38.50&appid=${apiKey}&units=metric&lang=ru`;
export const urlWeatherDataWeek: string = `https://api.openweathermap.org/data/2.5/forecast?lat=52.62&lon=38.50&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=ru`;
