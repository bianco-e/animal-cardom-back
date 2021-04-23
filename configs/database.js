require("dotenv").config();
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const DATABASE_NAME = process.env.DATABASE_NAME;

module.exports = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.cv5ri.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
