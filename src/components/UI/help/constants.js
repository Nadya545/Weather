export const apiKey = process.env.REACT_APP_API_KEY;
export const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=52.62&lon=38.50&appid=${apiKey}&units=metric&lang=ru`;
export const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=52.62&lon=38.50&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=ru`;
