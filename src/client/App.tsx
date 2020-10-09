import React, { FormEvent } from "react";
import AsyncRequest, {
  AsyncRequestCompleted,
  AsyncRequestFailed,
  AsyncRequestKinds,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from "./AsyncRequest";
import getLocation from "./getLocation";
import apiClient from "./apiClient";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";
import CurrentLocation from "./icons/CurrentLocation";
import "./App.css";

const CurrentWeather: React.FC<Readonly<{
  currentWeather: CurrentWeatherConditions;
}>> = ({ currentWeather }) => (
  <div>
    <h4>Current Weather Conditions</h4>
    <p>{JSON.stringify(currentWeather)}</p>
  </div>
);

const AsyncCurrentWeather: React.FC<Readonly<{
  asyncCurrentWeather: AsyncRequest<CurrentWeatherConditions>;
}>> = ({ asyncCurrentWeather }) => {
  switch (asyncCurrentWeather.kind) {
    case AsyncRequestKinds.Completed:
      return <CurrentWeather currentWeather={asyncCurrentWeather.result} />;
    case AsyncRequestKinds.Failed:
      return <p>Unable to load current weather conditions</p>;
    case AsyncRequestKinds.Loading:
      return <p>LOADING WEATHER!</p>;
    case AsyncRequestKinds.NotStarted:
      return <></>;
  }
};

const AsyncCurrentPosition: React.FC<Readonly<{
  asyncPosition: AsyncRequest<Position>;
}>> = ({ asyncPosition }) => {
  switch (asyncPosition.kind) {
    case AsyncRequestKinds.Failed:
      return <p>Unable to load current user location</p>;
    case AsyncRequestKinds.Loading:
      return <p>Loading Latitude and Longitude</p>;
    case AsyncRequestKinds.Completed:
    case AsyncRequestKinds.NotStarted:
      return <></>;
  }
};

const App: React.FC = () => {
  const [usersPosition, setUsersPosition] = React.useState<
    AsyncRequest<Position>
  >(AsyncRequestNotStarted);
  const [usersWeather, setUsersWeather] = React.useState<
    AsyncRequest<CurrentWeatherConditions>
  >(AsyncRequestNotStarted);
  const [userSearch, setUserSearch] = React.useState<string>("");

  const onGetWeatherSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setUsersWeather(AsyncRequestLoading());

    apiClient
      .getCurrentWeather(userSearch)
      .then((weatherConditions) =>
        setUsersWeather(AsyncRequestCompleted(weatherConditions))
      )
      .catch(() => {
        setUsersWeather(AsyncRequestFailed(undefined));
      });
  };

  const setUserPosition = (): void => {
    setUsersPosition(AsyncRequestLoading());

    getLocation(window.navigator)
      .then((position) => {
        setUsersPosition(AsyncRequestCompleted(position));
        setUserSearch(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      })
      .catch(() => {
        setUsersPosition(AsyncRequestFailed(undefined));
      });
  };

  const onUserSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserSearch(e.target.value);
  };

  return (
    <div className="weather-app">
      <header>
        <h1>Your Weather Report</h1>
      </header>
      <main>
        <form className="weather-form" onSubmit={onGetWeatherSubmit}>
          <input
            type="search"
            value={userSearch}
            onChange={onUserSearchInputChange}
          />
          <div onClick={setUserPosition}>
            <CurrentLocation />
          </div>
          <button type="submit">Get Weather</button>
        </form>
        {/* TODO (Nice to have):
            debounce the loading treatment if the async actions are quick
        */}
        <AsyncCurrentPosition asyncPosition={usersPosition} />
        <AsyncCurrentWeather asyncCurrentWeather={usersWeather} />
      </main>
    </div>
  );
};

export default App;
