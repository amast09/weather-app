import express, { Express } from "express";
import bodyParser from "body-parser";
import path from "path";
import weatherRouter from "./routes/weather";
import winston from "winston";
import expressWinston from "express-winston";
import { Environment, EnvironmentLocation } from "./environment";

const createApi = (environment: Environment): Express => {
  const api = express();

  api.use(bodyParser.json());
  api.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  api.use("/", express.static(path.join(`${process.cwd()}/build`)));

  if (environment.location !== EnvironmentLocation.Test) {
    api.use(
      expressWinston.logger({
        // TODO for Real Production: Connect with a different transport
        transports: [new winston.transports.Console()],
      })
    );
  }

  api.use("^/weather", weatherRouter(environment.openWeatherApiKey));

  return api;
};

export default createApi;
