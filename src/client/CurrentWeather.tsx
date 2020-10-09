import React from "react";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";
import "./CurrentWeatherStyles.css";

const CurrentWeather: React.FC<Readonly<{
  conditions: CurrentWeatherConditions;
}>> = ({ conditions }) => {
  const displayDate = new Date(conditions.dt * 1000).toLocaleDateString();
  const sunRiseDisplayDate = new Date(
    conditions.sys.sunrise * 1000
  ).toLocaleTimeString();
  const sunSetDisplayDate = new Date(
    conditions.sys.sunset * 1000
  ).toLocaleTimeString();

  return (
    <div className="current-weather-conditions">
      <div>
        <div key="location" className="current-weather-conditions__metric">
          <label id="current-condition-location">Location:</label>
          <p aria-labelledby="current-condition-location">{conditions.name}</p>
        </div>
        <div key="date" className="current-weather-conditions__metric">
          <label id="current-condition-date">Date:</label>
          <p aria-labelledby="current-condition-date">{displayDate}</p>
        </div>
        <div key="current-temp" className="current-weather-conditions__metric">
          <label id="current-condition-current-temp">Current Temp:</label>
          <p aria-labelledby="current-condition-current-temp">
            {Math.round(conditions.main.temp)}&#730;
          </p>
        </div>
        <div
          key="feels-like-temp"
          className="current-weather-conditions__metric"
        >
          <label id="current-condition-feels-like-temp">Feels Like:</label>
          <p aria-labelledby="current-condition-feels-like-temp">
            {Math.round(conditions.main.feels_like)}&#730;
          </p>
        </div>
        <div key="high-temp" className="current-weather-conditions__metric">
          <label id="current-condition-high-temp">High Temp:</label>
          <p aria-labelledby="current-condition-high-temp">
            {Math.round(conditions.main.temp_max)}&#730;
          </p>
        </div>
        <div key="low-temp" className="current-weather-conditions__metric">
          <label id="current-condition-low-temp">Low Temp:</label>
          <p aria-labelledby="current-condition-low-temp">
            {Math.round(conditions.main.temp_min)}&#730;
          </p>
        </div>
        <div key="humidity" className="current-weather-conditions__metric">
          <label id="current-condition-humidity">Humidity:</label>
          <p aria-labelledby="current-condition-humidity">
            {Math.round(conditions.main.humidity)}%
          </p>
        </div>
        <div key="wind-speed" className="current-weather-conditions__metric">
          <label id="current-condition-wind-speed">Wind Speed:</label>
          <p aria-labelledby="current-condition-wind-speed">
            {Math.round(conditions.wind.speed)} mph
          </p>
        </div>
        <div
          key="wind-direction"
          className="current-weather-conditions__metric"
        >
          <label id="current-condition-wind-direction">Wind Direction:</label>
          <p aria-labelledby="current-condition-wind-direction">
            {Math.round(conditions.wind.deg)} deg
          </p>
        </div>
        <div key="sunrise-time" className="current-weather-conditions__metric">
          <label id="current-condition-sunrise-time">Sunrise:</label>
          <p aria-labelledby="current-condition-sunrise-time">
            {sunRiseDisplayDate}
          </p>
        </div>
        <div key="sunset-time" className="current-weather-conditions__metric">
          <label id="current-condition-sunset-time">Sunset:</label>
          <p aria-labelledby="current-condition-sunset-time">
            {sunSetDisplayDate}
          </p>
        </div>
      </div>
      <div
        key="condition-image-container"
        className="current-weather-conditions__image-container"
      >
        {conditions.weather.map((w, idx) => (
          <React.Fragment key={`condition-${idx}`}>
            <img
              className="current-weather-conditions__image"
              src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
              alt="weather condition icon"
            />
            <p aria-labelledby="current-condition-">{w.description}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
