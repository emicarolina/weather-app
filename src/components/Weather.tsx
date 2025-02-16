import React, { useState } from "react";
import axios from "axios";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = "cea7de30e78b16ff1f1209804b6bb583";

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Cidade não encontrada. Tente novamente.");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">Previsão do Tempo</h2>
      <input
        type="text"
        placeholder="Digite o nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Buscar</button>
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <p>🌡️ {weather.main.temp}°C</p>
          <p>💧 {weather.main.humidity}%</p>
          <p>☁️ {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
