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
            {conditions.main.temp}
          </p>
        </div>
        <div
          key="feels-like-temp"
          className="current-weather-conditions__metric"
        >
          <label id="current-condition-feels-like-temp">Feels Like:</label>
          <p aria-labelledby="current-condition-feels-like-temp">
            {conditions.main.feels_like}
          </p>
        </div>
        <div key="high-temp" className="current-weather-conditions__metric">
          <label id="current-condition-high-temp">High Temp:</label>
          <p aria-labelledby="current-condition-high-temp">
            {conditions.main.temp_max}
          </p>
        </div>
        <div key="low-temp" className="current-weather-conditions__metric">
          <label id="current-condition-low-temp">Low Temp:</label>
          <p aria-labelledby="current-condition-low-temp">
            {conditions.main.temp_min}
          </p>
        </div>
        <div key="humidity" className="current-weather-conditions__metric">
          <label id="current-condition-humidity">Humidity:</label>
          <p aria-labelledby="current-condition-humidity">
            {conditions.main.humidity} %
          </p>
        </div>
        <div key="wind-speed" className="current-weather-conditions__metric">
          <label id="current-condition-wind-speed">Wind Speed:</label>
          <p aria-labelledby="current-condition-wind-speed">
            {conditions.wind.speed}
          </p>
        </div>
        <div
          key="wind-direction"
          className="current-weather-conditions__metric"
        >
          <label id="current-condition-wind-direction">Wind Direction:</label>
          <p aria-labelledby="current-condition-wind-direction">
            {conditions.wind.deg} deg
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
