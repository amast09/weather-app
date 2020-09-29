import React from "react";
import AsyncRequest, {
  AsyncRequestCompleted,
  AsyncRequestFailed,
  AsyncRequestKinds,
  AsyncRequestNotStarted,
} from "./AsyncRequest";
import getLocation from "./getLocation";

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
      return <p>Unable to retrieve position</p>;
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
  const [userPosition, setUserPosition] = React.useState<
    AsyncRequest<Position>
  >(AsyncRequestNotStarted);

  const userCurrentLocationButtonClickHandler = () => {
    getLocation(window.navigator)
      .then((position) => setUserPosition(AsyncRequestCompleted(position)))
      .catch(() => {
        setUserPosition(AsyncRequestFailed(undefined));
      });
  };

  return (
    <div className="weather-app">
      <header>
        <h1>Current Weather</h1>
      </header>
      <main>
        <button onClick={userCurrentLocationButtonClickHandler}>
          Use my current location
        </button>
        <AsyncCurrentPosition asyncPosition={userPosition} />
      </main>
    </div>
  );
};

export default App;
