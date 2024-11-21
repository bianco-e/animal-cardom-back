import express, { Express } from "express";
import cors from "cors";
// config variables
import CORS_CONFIG from "./config/cors";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./config/database";
import SERVER_CONFIG from "./config/server";
// routes
import routes from "./routes";
// utils
import log from "./utils/logger";
import { Knex } from "knex";

const app: Express = express();
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(routes);

app.listen(SERVER_CONFIG.PORT, () => log.info(`Running on port ${SERVER_CONFIG.PORT}`));

const knex: Knex = require('knex')({
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  searchPath: ['knex', 'public']
})

export default knex