import { url1, url2 } from "../constants/constants";
import axios from "axios";
import { location, apiKey2 } from "../constants/constants";
import { iconSet } from "../constants/constants";

export async function fetchWeatherData() {
  try {
    const response = await axios.get(url1);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
  }
}

export async function fetchWeatherDataWeek() {
  try {
    const response2 = await axios.get(url2);
    return response2.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
}

export async function fetchWeatherDataCalendar(date) {
  const formattedDate = date.toISOString().split("T")[0];
  const url3 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formattedDate}?key=${apiKey2}&iconSet=${iconSet}&unitGroup=metric&lang=ru`;

  try {
    const response3 = await axios.get(url3);
    return response3.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
}
