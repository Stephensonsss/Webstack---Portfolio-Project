import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert("Error fetching weather data");
    }
    setLoading(false);
  };

  if (!weather) {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <WeatherCard
        city={weather.name}
        temperature={weather.main.temp}
        description={weather.weather[0].description}
        humidity={weather.main.humidity}
      />
    </div>
  );
};

export default Dashboard;
