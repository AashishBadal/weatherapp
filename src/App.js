import React, { useState } from 'react';  // Removed useEffect import
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [history, setHistory] = useState([]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) return;
    
    const apiKey = '0fb414004e3cd93d41040e5cf00a8327'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit === 'C' ? 'metric' : 'imperial'}`;

    try {
      const response = await axios.get(apiUrl);
      setWeather(response.data);
      setError(null);
      if (!history.includes(city)) {
        setHistory([city, ...history].slice(0, 5)); // Keep last 5 searches
      }
    } catch (err) {
      setError('City not found or invalid.');
      setWeather(null);
    }
  };

  const handleUnitToggle = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = 'YOUR_API_KEY';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit === 'C' ? 'metric' : 'imperial'}`;
      
      try {
        const response = await axios.get(apiUrl);
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError('Unable to fetch weather for your location');
        setWeather(null);
      }
    });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="controls">
        <input 
          type="text" 
          placeholder="Enter city" 
          value={city} 
          onChange={handleCityChange}
        />
        <button onClick={handleSubmit}>Get Weather</button>
        <button onClick={handleUnitToggle}>{unit === 'C' ? 'Switch to °F' : 'Switch to °C'}</button>
        <button onClick={handleGeolocation}>Use Current Location</button>
      </div>

      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} unit={unit} />}
      
      <h3>Search History</h3>
      <ul className="history">
        {history.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log('Location fetched successfully', position.coords);
  },
  (error) => {
    console.log('Error fetching location', error);
  }
);


export default App;
