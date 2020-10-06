interface Environment {
  readonly openWeatherApiKey: string;
}

const boostrapEnvironment = (): Environment => {
  console.log(process.env);

  if (process.env.REACT_APP_OPEN_WEATHER_API_KEY !== undefined) {
    return {
      openWeatherApiKey: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    };
  } else {
    throw new Error("Missing Open Weather API key");
  }
};

export default boostrapEnvironment();
