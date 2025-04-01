import axios from "axios";
export async function fetchWeatherData() {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=52.62&lon=38.50&appid=2b5095c6e8dc014aff383a52deea90af&units=metric&lang=ru"
    );
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
  }
}

export async function fetchWeatherDataWeek() {
  try {
    const response2 = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=52.62&lon=38.50&exclude=current,minutely,hourly,alerts&appid=ca2efaaf0b9939aed4d79809ad7e2998&units=metric&lang=ru"
    );
    return response2.data;
  } catch (err) {
    console.error("Ошибка при получении данных о погоде:", err);
    return null;
  }
}
