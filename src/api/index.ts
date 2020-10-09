import express from "express";
import bodyParser from "body-parser";
import path from "path";
import weatherRouter from "./routes/weather";
import winston from "winston";
import expressWinston from "express-winston";

const api = express();

api.use(bodyParser.json());
api.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
api.use("/", express.static(path.join(`${process.cwd()}/build`)));
api.use(
  expressWinston.logger({
    // TODO for Real Production: Connect with a different transport
    transports: [new winston.transports.Console()],
  })
);

api.use("^/weather", weatherRouter);

export default api;
