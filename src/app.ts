import express from "express";
import cors from "cors";
import { config } from "./routes";
import { logError } from "./middleware/logError";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

Object.keys(config).forEach(k => {
  const routeConfig = config[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(logError);

export { app };
