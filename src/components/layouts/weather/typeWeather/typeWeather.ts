/*export interface WeatherData {
  currentConditions?: {
    // опишите структуру текущих условий
    temp: number;
    icon: string;
    conditions: string;
  };
  days?: Array<{
    // опишите структуру данных для дней
    temp: number;
    icon: string;
    description: string;
  }>;
}*/
export interface RenderWeatherProps {
  renderWeather: WeatherData;
}

export type weatherIconsKey =
  | "partly-cloudy-day"
  | "cloudy-day"
  | "clear-day"
  | "rain"
  | "cloudy"
  | "clear"
  | "partly-cloudy";

export interface CoordinatesProps {
  setLocation: (coordinates: Coordinates) => void;
  setLoading: (loading: boolean) => void;
}

/*export interface Coordinates {
  lat: string;
  lon: string;
  name: string;
}*/
export interface weatherParamsProps {
  weatherParams: {
    date: Date;
    coordinates: {
      lon: number;
      lat: number;
      name: string;
    };
  };
}

interface WeatherDay {
  date: string;
  weather: {
    icon: string;
    description: string;
  };
  temp: number;
}

export interface WeatherDaysInfoProps {
  weatherWeek: WeatherDay[];
}

export interface Coordinates {
  lon: number;
  lat: number;
  name: string;
}

export interface CurrentConditions {
  temp: number;
  icon: string;
  conditions: string;
}

export interface DayWeather {
  temp: number;
  icon: string;
  description: string;
}

export interface WeatherData {
  currentConditions?: CurrentConditions;
  days?: DayWeather[];
}

export interface YearsContainerProps {
  onYearChange: (year: number) => void;
}
export interface InitialWeatherParams {
  date: Date;
  coordinates: {
    lon: number;
    lat: number;
    name: string;
  };
}
