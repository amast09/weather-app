import axios from "axios";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";

const getCurrentWeather = (
  location: string
): Promise<CurrentWeatherConditions> => {
  return axios
    .get<CurrentWeatherConditions>("/weather", {
      params: { location },
    })
    .then((result) => result.data);
};

export default {
  getCurrentWeather,
};
