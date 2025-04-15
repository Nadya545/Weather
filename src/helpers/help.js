export function convertPressureToMmHg(pressure) {
  return (pressure * 0.750062).toFixed(2);
}

/*export function formattedDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }
  return date.toISOString().split("T")[0];//
}*/
