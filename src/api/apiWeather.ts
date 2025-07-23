import { urlWeatherData, urlWeatherDataWeek } from "../constants/constUrl";
import axios from "axios";
import { apiKey2 } from "../constants/constApiKey";
import { iconSet } from "../constants/constDiffrent";
export interface weatherParams {
  date: Date;
  coordinates: {
    lon: number;
    lat: number;
    name: string;
  };
}

export async function fetchWeatherData() {
  try {
    const response = await axios.get(urlWeatherData);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
  }
}

export async function fetchWeatherDataWeek() {
  try {
    const response = await axios.get(urlWeatherDataWeek);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
}

export function buildWeatherUrl(weatherParams: weatherParams) {
  const location = `${weatherParams.coordinates.lat},${weatherParams.coordinates.lon}`;
  const formattedDate = weatherParams.date.toISOString().split("T")[0];
  return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formattedDate}?key=${apiKey2}&iconSet=${iconSet}&unitGroup=metric&lang=ru`;
}

export async function fetchWeatherDataCalendar(weatherParams: weatherParams) {
  console.log("Широта:", weatherParams.coordinates.lat);
  console.log("Долгота:", weatherParams.coordinates.lon);
  const urlWeatherDataCalendar = buildWeatherUrl(weatherParams);
  console.log("URL для запроса:", urlWeatherDataCalendar); // Логирование URL
  try {
    const response = await axios.get(urlWeatherDataCalendar);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
}

export async function fetchСoordinates(city: string) {
  const urlCoordinate = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
  try {
    const coordinates = await axios.get(urlCoordinate);
    return coordinates.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
}
