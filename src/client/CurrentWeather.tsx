import React from "react";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";
import "./CurrentWeatherStyles.css";

const getDisplayDate = (unixUtcMilliSeconds: number): string => {
  const date = new Date();
  date.setUTCMilliseconds(unixUtcMilliSeconds);
  return date.toDateString();
};

// TODO (nice to have): display time better
const getDisplayTime = (unixUtcMilliSeconds: number): string => {
  const date = new Date();
  date.setUTCMilliseconds(unixUtcMilliSeconds);
  return date.toTimeString();
};

const CurrentWeather: React.FC<Readonly<{
  conditions: CurrentWeatherConditions;
}>> = ({ conditions }) => {
  const displayDate = getDisplayDate(conditions.dt);
  const sunRiseDisplayDate = getDisplayTime(conditions.sys.sunrise);
  const sunSetDisplayDate = getDisplayTime(conditions.sys.sunset);

  return (
    <div className="current-weather-conditions">
      <div>
        <div className="current-weather-conditions__metric">
          <label>Location:</label>
          <p>{conditions.name}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Date:</label>
          <p>{displayDate}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Current Temp:</label>
          <p>{conditions.main.temp}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Feels Like:</label>
          <p>{conditions.main.feels_like}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>High Temp:</label>
          <p>{conditions.main.temp_max}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Low Temp:</label>
          <p>{conditions.main.temp_min}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Humidity:</label>
          <p>{conditions.main.humidity}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Wind Speed:</label>
          <p>{conditions.wind.speed}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Wind Direction:</label>
          <p>{conditions.wind.deg} deg</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Sunrise:</label>
          <p>{sunRiseDisplayDate}</p>
        </div>
        <div className="current-weather-conditions__metric">
          <label>Sunset:</label>
          <p>{sunSetDisplayDate}</p>
        </div>
      </div>
      <div className="current-weather-conditions__image-container">
        {conditions.weather.map((w) => (
          <>
            <img
              className="current-weather-conditions__image"
              src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
              alt="weather condition icon"
            />
            <p>{w.description}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
