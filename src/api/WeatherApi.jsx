// api.js
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "7e3cc259b74c9340ce4b4c88f79c99a4";

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    const date = new Date(data.dt * 1000);

    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    const timeStr = date.toLocaleTimeString();

    const day = getDayWithSuffix(date.getDate());
    const month = date.toLocaleString("default", { month: "short" }); // 'Jan', 'Feb', etc.
    const year = date.getFullYear();

    // Format the date as "22nd Jan 2025"
    const formattedDate = `${day} ${month} ${year}`;

    console.log(data);

    return {
      city: city,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      feelsLike: data.main.feels_like,
      lat: data.coord.lat,
      lon: data.coord.lon,
      Time: timeStr,
      date: formattedDate,
      windSpeed: (data.wind.speed * 3.6).toFixed(2),
      weather: data.weather[0].main,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    throw error;
  }
};
