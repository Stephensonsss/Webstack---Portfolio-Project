import React from "react";

const WeatherCard = ({ city, temperature, description, humidity }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <p>Humidity: {humidity}%</p>
    </div>
  );
};

export default WeatherCard;
