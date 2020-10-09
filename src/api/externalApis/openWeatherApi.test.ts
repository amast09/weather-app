/**
 * @jest-environment node
 */
import axios from "axios";
import nock from "nock";
import {
  CityQuery,
  CityStateQuery,
  LatitudeLongitudeQuery,
  QueryType,
  ZipCodeQuery,
} from "../helpers/locationStringToQuery";
import openWeatherApi from "./openWeatherApi";
import { CurrentWeatherConditions } from "../../shared/types/OpenWeatherResponses";

const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org";
const EXPECTED_UNITS_OF_MEASUREMENT = "imperial";
const fakeApiKey = "gibberish";
const fakeSuccessfulResponse: CurrentWeatherConditions = {
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

axios.defaults.baseURL = OPEN_WEATHER_API_BASE_URL;

describe("openWeatherApi", () => {
  describe("getCurrentWeather", () => {
    it("returns a void promise when the Open Weather API request fails", async () => {
      const query: ZipCodeQuery = {
        queryType: QueryType.ZipCode,
        zipCode: "29464",
      };

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          zipcode: query.zipCode,
          appid: fakeApiKey,
          units: EXPECTED_UNITS_OF_MEASUREMENT,
        })
        .reply(400);

      await expect(
        openWeatherApi.getCurrentWeather(fakeApiKey, query)
      ).rejects.toThrow();
    });

    describe("when the Open Weather API responds successfully", () => {
      it("returns the response when requesting for weather for a zipcode", async () => {
        const query: ZipCodeQuery = {
          queryType: QueryType.ZipCode,
          zipCode: "29464",
        };

        nock(OPEN_WEATHER_API_BASE_URL)
          .get("/data/2.5/weather")
          .query({
            zip: query.zipCode,
            appid: fakeApiKey,
            units: EXPECTED_UNITS_OF_MEASUREMENT,
          })
          .reply(200, fakeSuccessfulResponse);

        await expect(
          openWeatherApi.getCurrentWeather(fakeApiKey, query)
        ).resolves.toEqual(fakeSuccessfulResponse);
      });

      it("returns the response when requesting for weather for a latitude and longitude", async () => {
        const query: LatitudeLongitudeQuery = {
          queryType: QueryType.LatitudeLongitude,
          latitude: 0,
          longitude: 1,
        };

        nock(OPEN_WEATHER_API_BASE_URL)
          .get("/data/2.5/weather")
          .query({
            lat: query.latitude,
            lon: query.longitude,
            appid: fakeApiKey,
            units: EXPECTED_UNITS_OF_MEASUREMENT,
          })
          .reply(200, fakeSuccessfulResponse);

        await expect(
          openWeatherApi.getCurrentWeather(fakeApiKey, query)
        ).resolves.toEqual(fakeSuccessfulResponse);
      });

      it("returns the response when requesting for weather for a city and state", async () => {
        const query: CityStateQuery = {
          queryType: QueryType.CityState,
          city: "Clemson",
          state: "South Carolina",
        };

        nock(OPEN_WEATHER_API_BASE_URL)
          .get("/data/2.5/weather")
          .query({
            q: `${query.city},${query.state}`,
            appid: fakeApiKey,
            units: EXPECTED_UNITS_OF_MEASUREMENT,
          })
          .reply(200, fakeSuccessfulResponse);

        await expect(
          openWeatherApi.getCurrentWeather(fakeApiKey, query)
        ).resolves.toEqual(fakeSuccessfulResponse);
      });

      it("returns the response when requesting for weather for a city", async () => {
        const query: CityQuery = {
          queryType: QueryType.City,
          city: "Clemson",
        };

        nock(OPEN_WEATHER_API_BASE_URL)
          .get("/data/2.5/weather")
          .query({
            q: query.city,
            appid: fakeApiKey,
            units: EXPECTED_UNITS_OF_MEASUREMENT,
          })
          .reply(200, fakeSuccessfulResponse);

        await expect(
          openWeatherApi.getCurrentWeather(fakeApiKey, query)
        ).resolves.toEqual(fakeSuccessfulResponse);
      });
    });
  });
});
