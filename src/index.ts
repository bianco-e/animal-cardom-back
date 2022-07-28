import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
// config variables
import CORS_CONFIG from "./config/cors";
import DB_URL from "./config/database";
import SERVER_CONFIG from "./config/server";
// routes
import routes from "./routes";
// utils
import log from "./utils/logger";

const app: Express = express();
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Animal Cardom API");
});

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to '${db.name}' db`));

app.listen(SERVER_CONFIG.PORT, () => log.info(`Running on port ${SERVER_CONFIG.PORT}`));
