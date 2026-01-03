import React, { useState } from "react";
import "./weather.css";
import WeatherCard from "./WeatherCard";

const Weather = () => {
  const [inputVal, setInputVal] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!inputVal.trim()) return;

    setIsLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${inputVal}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      const weatherDetails = {
        temperature: data.current.temp_c + "°C",
        humidity: data.current.humidity + "%",
        condition: data.current.condition.text,
        windspeed: data.current.wind_kph + " kph",
      };

      setWeatherData(weatherDetails);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          value={inputVal}
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p>Loading data...</p>}

      {weatherData && (
          <div className='weather-cards'>
              <WeatherCard title="Temperature" value={weatherData.temperature} />
              <WeatherCard title="Humidity" value={weatherData.humidity} />
              <WeatherCard title="Condition" value={weatherData.condition} />
              <WeatherCard title="Wind Speed" value={weatherData.windspeed} />
        </div>
      )}
    </div>
  );
};

export default Weather;
