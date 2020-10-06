import React from "react";
import AsyncRequest, {
  AsyncRequestCompleted,
  AsyncRequestFailed,
  AsyncRequestKinds,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from "./AsyncRequest";
import getLocation from "./getLocation";
import createOpenWeatherApi, {
  CurrentWeatherConditions,
} from "./openWeatherApi";
import LatLon from "./LatLon";
import sum from "../shared/sum";

const openWeatherApi = createOpenWeatherApi("moving into API");

const fallBackLatLon: LatLon = {
  lat: 34.6787,
  lon: 82.8432,
};

const CurrentWeather: React.FC<Readonly<{
  currentWeather: CurrentWeatherConditions;
}>> = ({ currentWeather }) => (
  <div>
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

const CurrentPosition: React.FC<Readonly<{ position: Position }>> = ({
  position,
}) => (
  <div>
    <h1>Current Position</h1>
    <p>Latitude: {position.coords.latitude}</p>
    <p>Longitude: {position.coords.longitude}</p>
  </div>
);

const AsyncCurrentPosition: React.FC<Readonly<{
  asyncPosition: AsyncRequest<Position>;
}>> = ({ asyncPosition }) => {
  switch (asyncPosition.kind) {
    case AsyncRequestKinds.Completed:
      return <CurrentPosition position={asyncPosition.result} />;
    case AsyncRequestKinds.Failed:
      return (
        <p>
          Unable to load current user location, using the fallback Latitude:
          {fallBackLatLon.lat} Longitude: {fallBackLatLon.lon}
        </p>
      );
    case AsyncRequestKinds.Loading:
      return (
        <p>
          Please enable browser location in order to find weather for current
          location
        </p>
      );
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

  const loadUserWeather = async (latLon: LatLon): Promise<void> => {
    setUsersWeather(AsyncRequestLoading());

    try {
      const weatherConditions = await openWeatherApi.getWeatherForLatLng(
        latLon
      );
      setUsersWeather(AsyncRequestCompleted(weatherConditions));
    } catch (_) {
      setUsersWeather(AsyncRequestFailed(undefined));
    }
  };

  const loadUserPosition = async (): Promise<Position> => {
    setUsersPosition(AsyncRequestLoading());

    try {
      const position = await getLocation(window.navigator);
      setUsersPosition(AsyncRequestCompleted(position));
      return position;
    } catch (e) {
      setUsersPosition(AsyncRequestFailed(undefined));
      throw e;
    }
  };

  const useCurrentLocationButtonClickHandler = async () => {
    try {
      const position = await loadUserPosition();
      await loadUserWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    } catch (_) {
      await loadUserWeather(fallBackLatLon);
    }
  };

  return (
    <div className="weather-app">
      <header>
        <h1>Current Weather {sum(1, 2)}</h1>
      </header>
      <main>
        <AsyncCurrentWeather asyncCurrentWeather={usersWeather} />
        <button onClick={useCurrentLocationButtonClickHandler}>
          Use my current location
        </button>
        <AsyncCurrentPosition asyncPosition={usersPosition} />
      </main>
    </div>
  );
};

export default App;
