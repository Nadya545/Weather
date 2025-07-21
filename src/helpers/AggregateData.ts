interface WeatherForecast {
  dt: number; // Время в формате Unix
  weather: Array<{
    description: string;
    icon: string;
  }>;
  main: {
    temp: number; // Температура
    humidity: number; // Влажность
    pressure: number; // Давление
  };
}

interface WeatherData {
  list: WeatherForecast[]; // Массив прогнозов
}

export function aggregatWeatherData(weatherForecasts: WeatherData) {
  const dailyForecasts: {
    [key: string]: {
      temp: number;
      count: number;
      weather: any;
      humidity: number;
      pressure: number;
    };
  } = {};
  weatherForecasts.list.forEach((hourlyForecast) => {
    const forecastDate = new Date(
      hourlyForecast.dt * 1000
    ).toLocaleDateString();
    if (!dailyForecasts[forecastDate]) {
      dailyForecasts[forecastDate] = {
        temp: 0,
        count: 0,
        weather: hourlyForecast.weather[0],
        humidity: hourlyForecast.main.humidity,
        pressure: hourlyForecast.main.pressure,
      };
    }
    dailyForecasts[forecastDate].temp += hourlyForecast.main.temp; // Sum temperatures
    dailyForecasts[forecastDate].count += 1;
  });
  const aggregatedData = Object.keys(dailyForecasts).map((date) => ({
    date,
    temp: (dailyForecasts[date].temp / dailyForecasts[date].count).toFixed(1), // Average temperature
    weather: dailyForecasts[date].weather,
    humidity: dailyForecasts[date].humidity,
    pressure: dailyForecasts[date].pressure,
  }));
  return aggregatedData;
}
