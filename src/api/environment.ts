import dotenv from "dotenv";

export enum EnvironmentLocation {
  Production = "Production",
  Development = "Development",
  Test = "Test",
}

export interface Environment {
  readonly openWeatherApiKey: string;
  readonly apiPort: number;
  readonly location: EnvironmentLocation;
}

const getEnvironmentLocation = (): EnvironmentLocation => {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return EnvironmentLocation.Production;
  } else if (nodeEnv === "CI" || nodeEnv === "test") {
    return EnvironmentLocation.Test;
  } else {
    return EnvironmentLocation.Development;
  }
};

const boostrapEnvironment = (): Environment => {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  if (process.env.OPEN_WEATHER_API_KEY === undefined) {
    throw new Error("Missing Environment Variable: OPEN_WEATHER_API_KEY");
  } else if (process.env.API_PORT === undefined) {
    throw new Error("Missing Environment Variable: APP_API_PORT");
  } else {
    return {
      openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
      apiPort: Number(process.env.API_PORT) ? Number(process.env.API_PORT) : 80,
      location: getEnvironmentLocation(),
    };
  }
};

export default boostrapEnvironment();
