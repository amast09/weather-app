/**
 * @jest-environment node
 */
import request from "supertest";
import httpStatus from "http-status";
import axios from "axios";
import { CurrentWeatherConditions } from "../../shared/types/OpenWeatherResponses";
import nock from "nock";
import createApi from "../index";
import { Environment, EnvironmentLocation } from "../environment";
import { Express } from "express";

const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org";
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

const fakeEnvironment: Environment = {
  openWeatherApiKey: "gibberish",
  location: EnvironmentLocation.Test,
  apiPort: 80,
};

describe("weather routes", () => {
  let api: Express;
  const WEATHER_BASE_PATH = "/weather";

  beforeEach(() => {
    api = createApi(fakeEnvironment);
  });

  describe("GET /weather", () => {
    it("requires a location query param", async () => {
      const response = await request(api)
        .get(WEATHER_BASE_PATH)
        .query({})
        .set("Accept", "application/json");

      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors[0].context.key).toEqual("location");
      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("returns a 424 - FAILED_DEPENDENCY status when the Open Weather API fails", async () => {
      const locationQueryParamValue = "29464";

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          zipCode: locationQueryParamValue,
          appid: fakeEnvironment.openWeatherApiKey,
        })
        .reply(500);

      const response = await request(api)
        .get(WEATHER_BASE_PATH)
        .query({ location: locationQueryParamValue })
        .set("Accept", "application/json");

      expect(response.status).toEqual(httpStatus.FAILED_DEPENDENCY);
    });

    it("returns weather data for a zip code location query", async () => {
      const locationQueryParamValue = "29464";

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          zipCode: locationQueryParamValue,
          appid: fakeEnvironment.openWeatherApiKey,
        })
        .reply(200, fakeSuccessfulResponse);

      const response = await request(api)
        .get(WEATHER_BASE_PATH)
        .query({ location: locationQueryParamValue })
        .set("Accept", "application/json");

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body.data).toEqual(fakeSuccessfulResponse);
    });

    it("returns weather data for a lat + long location query", async () => {
      const latitude = "25";
      const longitude = "25";
      const locationQueryParamValue = `${latitude}, ${longitude}`;

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          lat: latitude,
          lon: longitude,
          appid: fakeEnvironment.openWeatherApiKey,
        })
        .reply(200, fakeSuccessfulResponse);

      const response = await request(api)
        .get(WEATHER_BASE_PATH)
        .query({ location: locationQueryParamValue })
        .set("Accept", "application/json");

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body.data).toEqual(fakeSuccessfulResponse);
    });

    it("returns weather data for a city + state location query", async () => {
      const city = "Clemson";
      const state = "South Carolina";
      const locationQueryParamValue = `${city}, ${state}`;

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          city: city,
          state: state,
          appid: fakeEnvironment.openWeatherApiKey,
        })
        .reply(200, fakeSuccessfulResponse);

      const response = await request(api)
        .get(WEATHER_BASE_PATH)
        .query({ location: locationQueryParamValue })
        .set("Accept", "application/json");

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body.data).toEqual(fakeSuccessfulResponse);
    });

    it("returns weather data for a city location query", async () => {
      const city = "Clemson";
      const locationQueryParamValue = `${city}`;

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          city,
          appid: fakeEnvironment.openWeatherApiKey,
        })
        .reply(200, fakeSuccessfulResponse);

      const response = await request(api)
        .get(WEATHER_BASE_PATH)
        .query({ location: locationQueryParamValue })
        .set("Accept", "application/json");

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body.data).toEqual(fakeSuccessfulResponse);
    });
  });
});
