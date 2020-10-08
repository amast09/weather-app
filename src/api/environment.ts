import dotenv from "dotenv";

export enum EnvironmentLocation {
  Production = "Production",
  Development = "Development",
}

interface Environment {
  readonly openWeatherApiKey: string;
  readonly apiPort: string;
  readonly location: EnvironmentLocation;
}

const boostrapEnvironment = (): Environment => {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  } else {
    console.log(result.parsed);
  }

  if (process.env.OPEN_WEATHER_API_KEY === undefined) {
    throw new Error("Missing Environment Variable: OPEN_WEATHER_API_KEY");
  } else if (process.env.API_PORT === undefined) {
    throw new Error("Missing Environment Variable: APP_API_PORT");
  } else {
    return {
      openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
      apiPort: process.env.API_PORT,
      location:
        process.env.NODE_ENV === "production"
          ? EnvironmentLocation.Production
          : EnvironmentLocation.Development,
    };
  }
};

export default boostrapEnvironment();
