import LatLon from "./LatLon";
import axios from "axios";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";

const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org";

const getWeatherForLatLng = (apiKey: string) => (
  latLon: LatLon
): Promise<CurrentWeatherConditions> => {
  return axios
    .get<CurrentWeatherConditions>(
      `${OPEN_WEATHER_API_BASE_URL}/data/2.5/weather`,
      {
        params: {
          lat: latLon.lat,
          lon: latLon.lon,
          appid: apiKey,
        },
      }
    )
    .then((result) => result.data);
};

interface OpenWeatherApi {
  readonly getWeatherForLatLng: (
    latLon: LatLon
  ) => Promise<CurrentWeatherConditions>;
}

export default (apiKey: string): OpenWeatherApi => ({
  getWeatherForLatLng: getWeatherForLatLng(apiKey),
});
