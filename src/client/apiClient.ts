import axios from "axios";
import { CurrentWeatherConditions } from "../shared/types/OpenWeatherResponses";
import { SuccessfulResponse } from "../shared/types/ApiResponse";

const getCurrentWeather = (
  location: string
): Promise<CurrentWeatherConditions> => {
  return axios
    .get<SuccessfulResponse<CurrentWeatherConditions>>("/weather", {
      params: { location },
    })
    .then((result) => result.data.data);
};

export default {
  getCurrentWeather,
};
