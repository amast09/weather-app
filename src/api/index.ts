import express from "express";
import bodyParser from "body-parser";
import path from "path";
import environment from "./environment";

const buildDir = path.join(process.cwd() + "/build");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));

app.get("/", (_, res) => {
  res.status(200);
  res.sendFile(path.join(buildDir, "index.html"));
});

app.listen(environment.apiPort, () => {
  console.log(`Server now listening on port: ${environment.apiPort}`);
});
