import express from "express";
import bodyParser from "body-parser";
import path from "path";
import sum from "../shared/sum";

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
  res.json({ foo: sum(1, 2) });
});

const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
