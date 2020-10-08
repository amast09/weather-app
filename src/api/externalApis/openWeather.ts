import { LocationQuery } from "../helpers/locationStringToQuery";
import { CurrentWeatherConditions } from "../../shared/types/OpenWeatherResponses";

const getCurrentWeather = (
  apiKey: string,
  request: LocationQuery
): Promise<CurrentWeatherConditions> => {
  console.log(apiKey);
  console.log(request);
  return Promise.reject();
};

export default { getCurrentWeather };
