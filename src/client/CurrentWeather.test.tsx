import React from "react";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";
import { render, screen } from "@testing-library/react";
import CurrentWeather from "./CurrentWeather";

const conditions: CurrentWeatherConditions = {
  coord: { lon: 139, lat: 35 },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01n",
    },
  ],
  base: "stations",
  main: {
    temp: 281.52,
    feels_like: 278.99,
    temp_min: 280.15,
    temp_max: 283.71,
    pressure: 1016,
    humidity: 93,
  },
  wind: {
    speed: 0.47,
    deg: 107.538,
  },
  clouds: {
    all: 2,
  },
  dt: 1560350192,
  sys: {
    type: 3,
    id: 2019346,
    message: 0.0065,
    country: "JP",
    sunrise: 1560281377,
    sunset: 1560333478,
  },
  timezone: 32400,
  id: 1851632,
  name: "Shuzenji",
  cod: 200,
};

const expectedDate = new Date(conditions.dt * 1000).toLocaleDateString();
const expectedSunrise = new Date(
  conditions.sys.sunrise * 1000
).toLocaleTimeString();
const expectedSunset = new Date(
  conditions.sys.sunset * 1000
).toLocaleTimeString();

describe("<CurrentWeather />", () => {
  it.each`
    conditionLabel       | expectedTextOfElement
    ${"Location:"}       | ${conditions.name}
    ${"Date:"}           | ${expectedDate}
    ${"Current Temp:"}   | ${conditions.main.temp.toString(10)}
    ${"Feels Like:"}     | ${conditions.main.feels_like.toString(10)}
    ${"High Temp:"}      | ${conditions.main.temp_max.toString(10)}
    ${"Low Temp:"}       | ${conditions.main.temp_min.toString(10)}
    ${"Humidity:"}       | ${`${conditions.main.humidity} %`}
    ${"Wind Speed:"}     | ${conditions.wind.speed.toString(10)}
    ${"Wind Direction:"} | ${`${conditions.wind.deg} deg`}
    ${"Sunrise:"}        | ${expectedSunrise}
    ${"Sunset:"}         | ${expectedSunset}
  `(
    "should have a `$conditionLabel` label with `$expectedTextOfElement` text",
    ({ conditionLabel, expectedTextOfElement }) => {
      render(<CurrentWeather conditions={conditions} />);

      expect(screen.getByLabelText(conditionLabel).textContent).toEqual(
        expectedTextOfElement
      );
    }
  );
});
