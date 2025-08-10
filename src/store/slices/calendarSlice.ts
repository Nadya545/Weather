import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateMonthData } from "../../helpers/generateMonthData";

interface CalendarState {
  selectedYear: number;
  monthData: (string | null)[][];
  selectedMonth: number;
  selectedDate: string | null;
  isLoading: boolean;
  weatherData: {
    currentConditions?: any;
    days?: any;
  };
}

const serializeMonthData = (data: (Date | null)[][]) => {
  return data.map((week) =>
    week.map((date) => (date ? date.toISOString() : null))
  );
};

const initialState: CalendarState = {
  selectedYear: new Date().getFullYear(),
  monthData: [],
  selectedMonth: new Date().getMonth() + 1,
  selectedDate: new Date().toISOString(),
  isLoading: false,
  weatherData: {},
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
    setMonthData: (state, action: PayloadAction<(string | null)[][]>) => {
      state.monthData = action.payload;
    },
    setSelectedMonth: (state, action: PayloadAction<number>) => {
      state.selectedMonth = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    prevMonth: (state) => {
      const newMonth = state.selectedMonth === 1 ? 12 : state.selectedMonth - 1;
      const newYear =
        state.selectedMonth === 1 ? state.selectedYear - 1 : state.selectedYear;
      state.selectedMonth = newMonth;
      state.selectedYear = newYear;
      state.monthData = serializeMonthData(
        generateMonthData(newYear, newMonth)
      );
    },
    nextMonth: (state) => {
      const newMonth = state.selectedMonth === 12 ? 1 : state.selectedMonth + 1;
      const newYear =
        state.selectedMonth === 12
          ? state.selectedYear + 1
          : state.selectedYear;
      state.selectedMonth = newMonth;
      state.selectedYear = newYear;
      state.monthData = serializeMonthData(
        generateMonthData(newYear, newMonth)
      );
    },
  },
});

export const {
  setSelectedYear,
  setSelectedMonth,
  setMonthData,
  setSelectedDate,
  setLoading,
  prevMonth,
  nextMonth,
} = calendarSlice.actions;

export default calendarSlice.reducer;
