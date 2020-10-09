import axios from "axios";
import nock from "nock";
import apiClient from "./apiClient";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";

const BASE_URL = 'http://localhost';
axios.defaults.baseURL = BASE_URL;

describe("openWeatherApi", () => {
  describe("getWeatherForLatLng", () => {
    it("returns a void promise on failure", async () => {
      const location = "Clemson, SC";

      nock(BASE_URL)
        .get("/weather")
        .query({
          location,
        })
        .reply(400);

      await expect(apiClient.getCurrentWeather(location)).rejects.toThrow();
    });

    it("returns the response from the API when it succeeds", async () => {
      const location = "Clemson, SC";
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

      nock(BASE_URL)
        .get("/weather")
        .query({ location })
        .reply(200, fakeSuccessfulResponse);

      await expect(apiClient.getCurrentWeather(location)).resolves.toEqual(
        fakeSuccessfulResponse
      );
    });
  });
});
