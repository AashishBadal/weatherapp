import React from 'react';
import { FaCloud, FaSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const getWeatherIcon = (description) => {
  switch (description) {
    case 'clear sky':
      return <FaSun size={50} />;
    case 'few clouds':
    case 'scattered clouds':
      return <FaCloud size={50} />;
    case 'rain':
    case 'shower rain':
      return <FaCloudRain size={50} />;
    case 'snow':
      return <FaSnowflake size={50} />;
    default:
      return <FaCloud size={50} />;
  }
};

const WeatherCard = ({ weather, unit }) => {
  const temperature = unit === 'C' ? weather.main.temp : weather.main.temp * 9/5 + 32;
  const tempUnit = unit === 'C' ? '°C' : '°F';
  const weatherIcon = getWeatherIcon(weather.weather[0].description);

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-icon">{weatherIcon}</div>
      <p>{weather.weather[0].description}</p>
      <p className="temperature">{Math.round(temperature)}{tempUnit}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
