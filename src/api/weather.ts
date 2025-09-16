import { urlWeatherData, urlWeatherDataWeek } from "../constants/url";
import axios from "axios";
import { apiKey2 } from "../constants/apiKey";
import { iconSet } from "../constants/diffrent";
export interface weatherParams {
  date: Date;
  coordinates: {
    lon: number;
    lat: number;
    name: string;
  };
}

export const fetchWeatherData = async () => {
  try {
    const response = await axios.get(urlWeatherData);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
  }
};

export const fetchWeatherDataWeek = async () => {
  try {
    const response = await axios.get(urlWeatherDataWeek);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
};

export const buildWeatherUrl = async (weatherParams: weatherParams) => {
  const location = `${weatherParams.coordinates.lat},${weatherParams.coordinates.lon}`;
  const formattedDate = weatherParams.date.toISOString().split("T")[0];
  return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formattedDate}?key=${apiKey2}&iconSet=${iconSet}&unitGroup=metric&lang=ru`;
};

export const fetchWeatherDataCalendar = async (
  weatherParams: weatherParams
) => {
  console.log("Широта:", weatherParams.coordinates.lat);
  console.log("Долгота:", weatherParams.coordinates.lon);
  const urlWeatherDataCalendar = buildWeatherUrl(weatherParams);
  console.log("URL для запроса:", urlWeatherDataCalendar); // Логирование URL
  try {
    const response = await axios.get(await urlWeatherDataCalendar);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
};

export const fetchСoordinates = async (city: string) => {
  const urlCoordinate = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
  try {
    const coordinates = await axios.get(urlCoordinate);
    return coordinates.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
};
