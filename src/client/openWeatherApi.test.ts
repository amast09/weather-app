/**
 * @jest-environment node
 */
import axios from "axios";
import nock from "nock";
import createOpenWeatherApi from "./openWeatherApi";
import LatLon from "./LatLon";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";

const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org";
const fakeApiKey = "gibberish";

axios.defaults.baseURL = OPEN_WEATHER_API_BASE_URL;

const openWeatherApi = createOpenWeatherApi(fakeApiKey);

describe("openWeatherApi", () => {
  describe("getWeatherForLatLng", () => {
    it("returns a void promise on failure", async () => {
      const latLon: LatLon = {
        lat: 9,
        lon: 8,
      };

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          lat: latLon.lat,
          lon: latLon.lon,
          appid: fakeApiKey,
        })
        .reply(400);

      await expect(
        openWeatherApi.getWeatherForLatLng(latLon)
      ).rejects.toThrow();
    });

    it("returns a the response from the Open Weather API when it succeeds", async () => {
      const latLon: LatLon = {
        lat: 9,
        lon: 8,
      };
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

      nock(OPEN_WEATHER_API_BASE_URL)
        .get("/data/2.5/weather")
        .query({
          lat: latLon.lat,
          lon: latLon.lon,
          appid: fakeApiKey,
        })
        .reply(200, fakeSuccessfulResponse);

      await expect(openWeatherApi.getWeatherForLatLng(latLon)).resolves.toEqual(
        fakeSuccessfulResponse
      );
    });
  });
});
