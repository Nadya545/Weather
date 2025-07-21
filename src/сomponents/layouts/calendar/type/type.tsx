import { weatherIcons } from "../const/const";
export type weatherIconsKey =
  | "partly-cloudy-day"
  | "cloudy-day"
  | "clear-day"
  | "rain"
  | "cloudy"
  | "clear"
  | "partly-cloudy";

export interface CalendarProps {
  selectedYear: number;
  selectedMonth: number;
  monthData: (Date | null)[][];
  setDate: (date: Date) => void;
  setLoading: (loading: boolean) => void;
  setSelectedYear: (year: number) => void;
  setMonthData: (data: (Date | null)[][]) => void;
  setSelectedMonth: (month: number) => void;
}

export interface WeatherData {
  days?: {
    icon: keyof typeof weatherIcons;
    description: string;
    temp: number;
  }[];
}
export interface WeatherCalendarProps {
  data: WeatherData;
}

export interface WeatherDataNow {
  currentConditions?: {
    icon: keyof typeof weatherIcons;
    conditions: string;
    temp: number;
  };
}
export interface WeatherCalendarPropsNow {
  data: WeatherDataNow;
}
