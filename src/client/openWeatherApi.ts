import LatLon from "./LatLon";
import axios from "axios";

const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org";

export interface CurrentWeatherConditions {
  readonly coord: {
    readonly lon: number;
    readonly lat: number;
  };
  readonly weather: [
    {
      readonly id: number;
      readonly main: string;
      readonly description: string;
      readonly icon: string;
    }
  ];
  readonly base: string;
  readonly main: {
    readonly temp: number;
    readonly feels_like: number;
    readonly temp_min: number;
    readonly temp_max: number;
    readonly pressure: number;
    readonly humidity: number;
  };
  readonly wind: {
    readonly speed: number;
    readonly deg: number;
  };
  readonly clouds: {
    readonly all: number;
  };
  readonly dt: number;
  readonly sys: {
    readonly type: number;
    readonly id: number;
    readonly message: number;
    readonly country: string;
    readonly sunrise: number;
    readonly sunset: number;
  };
  readonly timezone: number;
  readonly id: number;
  readonly name: string;
  readonly cod: number;
}

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
