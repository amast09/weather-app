import { LocationQuery, QueryType } from "../helpers/locationStringToQuery";
import { CurrentWeatherConditions } from "../../shared/types/OpenWeatherResponses";
import axios from "axios";
import Dictionary from "../../shared/types/Dictionary";
import logger from "../logger";

const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org";

const getRequestData = (query: LocationQuery): Dictionary<string> => {
  switch (query.queryType) {
    case QueryType.ZipCode:
      return {
        zipCode: query.zipCode,
      };
    case QueryType.LatitudeLongitude:
      return {
        lat: query.latitude.toString(10),
        lon: query.longitude.toString(10),
      };
    case QueryType.City:
      return {
        city: query.city,
      };
    case QueryType.CityState:
      return {
        city: query.city,
        state: query.state,
      };
  }
};

const getCurrentWeather = (
  apiKey: string,
  locationQuery: LocationQuery
): Promise<CurrentWeatherConditions> =>
  axios
    .get<CurrentWeatherConditions>(
      `${OPEN_WEATHER_API_BASE_URL}/data/2.5/weather`,
      {
        params: {
          ...getRequestData(locationQuery),
          appid: apiKey,
        },
      }
    )
    .then((result) => result.data)
    .catch((e) => {
      logger.info({ ...e, tag: "openWeatherApi" });
      throw e;
    });

export default { getCurrentWeather };
