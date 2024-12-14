// App.js
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const locations = [
        { value: 'New York', label: 'New York' },
        { value: 'London', label: 'London' },
        { value: 'Tokyo', label: 'Tokyo' },
        { value: 'Mumbai', label: 'Mumbai' },
    ];

    const fetchWeather = async (location) => {
        try {
            const weatherResponse = await axios.get(
                `http://localhost:5000/weather?location=${location}`
            );
            setCurrentWeather(weatherResponse.data);

            const forecastResponse = await axios.get(
                `http://localhost:5000/forecast?location=${location}`
            );
            setForecast(forecastResponse.data.list.slice(0, 5)); // First 5 entries (forecast)
        } catch (error) {
            console.error('Error fetching weather data', error);
        }
    };

    const handleLocationChange = (selectedOption) => {
        setLocation(selectedOption.value);
        fetchWeather(selectedOption.value);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Weather App</h1>
            <div style={{ marginBottom: '20px', width: '300px' }}>
                <Select
                    options={locations}
                    onChange={handleLocationChange}
                    placeholder="Select a location"
                />
            </div>

            {currentWeather && (
                <div>
                    <h2>Current Weather in {location}</h2>
                    <p>Temperature: {currentWeather.main.temp}°C</p>
                    <p>Condition: {currentWeather.weather[0].description}</p>
                    <p>Humidity: {currentWeather.main.humidity}%</p>
                    <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
                </div>
            )}

            {forecast && (
                <div>
                    <h2>5-Hour Forecast</h2>
                    <ul>
                        {forecast.map((item, index) => (
                            <li key={index}>
                                {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.main.temp}°C, {item.weather[0].description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
