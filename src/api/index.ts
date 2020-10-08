import express from "express";
import bodyParser from "body-parser";
import path from "path";
import environment from "./environment";
import weatherRouter from "./routes/weather";
import winston from "winston";
import expressWinston from "express-winston";

const buildDir = path.join(process.cwd() + "/build");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));
app.use(
  expressWinston.logger({
    // TODO for Real Production: Connect with a different transport
    transports: [new winston.transports.Console()],
  })
);

app.use("^/weather", weatherRouter);

app.listen(environment.apiPort, () => {
  console.log(`Server now listening on port: ${environment.apiPort}`);
});
