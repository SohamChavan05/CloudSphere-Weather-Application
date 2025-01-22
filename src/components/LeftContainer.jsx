import "../styles/LeftContainer.css";
import { useState } from "react";
import { fetchWeatherData } from "../api/WeatherApi";
import minImg from "../assets/img/min.png";
import maxImg from "../assets/img/max.png";
import windImg from "../assets/img/wind.png";
import humidityImg from "../assets/img/humidity.png";
import searchImg from "../assets/img/search.png";

export default function LeftContainer() {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    city: "--",
    temp: "--",
    tempMin: "--",
    tempMax: "--",
    feelsLike: "--",
    humidity: "--",
    lat: "--",
    lon: "--",
    Date: "--",
    windSpeed: "--",
    weather: "--",
    icon: "--",
  });

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "7e3cc259b74c9340ce4b4c88f79c99a4";

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      setError(false);
      evt.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await fetchWeatherData(city);
      console.log(newInfo);
      setWeatherInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="leftContainer">
      <div className="col1">
        <div className="location">
          <h1>{weatherInfo.city.toLocaleUpperCase()}</h1>
          <p>
            {weatherInfo.lat}&deg;N, {weatherInfo.lon}&deg;E
          </p>
        </div>
        <div className="temp">
          <h1>{weatherInfo.temp}&deg;C</h1>
        </div>
      </div>
      <div className="weather">
        <p className="title">{weatherInfo.weather}</p>
        <p>weather</p>
      </div>
      <div className="col2">
        <div className="row1">
          <div className="item">
            <h4>Min</h4>
            <img src={minImg} />
            <p>{weatherInfo.tempMin}&deg;C</p>
          </div>
          <div className="item">
            <h4>Wind Speed</h4>
            <img src={windImg} />
            <p>{weatherInfo.windSpeed}km/hr</p>
          </div>
        </div>
        <div className="row2">
          <div className="item">
            <h4>Max</h4>
            <img src={maxImg} />
            <p>{weatherInfo.tempMax}&deg;C</p>
          </div>
          <div className="item">
            <h4>Humidity</h4>
            <img src={humidityImg} />
            <p>{weatherInfo.humidity}</p>
          </div>
        </div>
      </div>

      <div className="col3">
        <form onSubmit={handleSubmit}>
          <div className="searchBox">
            <input id="city" required onChange={handleChange} value={city} />
            <button type="submit">
              <img src={searchImg} />
            </button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>Place Not Found</p>}
      </div>
    </div>
  );
}
