import { url1, url2 } from "./UI/help/constants";
import axios from "axios";
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
