import { InitialWeatherParams } from "../components/layouts/weather/typeWeather/typeWeather";

export const iconSet: string = "icons1";

export const initialWeatherParams: InitialWeatherParams = {
  date: new Date(),
  coordinates: {
    lon: 38.5,
    lat: 52.6,
    name: "Елец",
  },
};
