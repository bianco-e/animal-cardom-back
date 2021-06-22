const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_URL = require("./configs/database");
require("dotenv").config();
const animalsRoutes = require("./routes/animals.js");
const gamesRoutes = require("./routes/games.js");
const plantsRoutes = require("./routes/plants.js");
const terrainsRoutes = require("./routes/terrains.js");
const usersRoutes = require("./routes/users.js");
const trackingRoutes = require("./routes/tracking.js");
const feedbackRoutes = require("./routes/feedback.js");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(animalsRoutes);
app.use(gamesRoutes);
app.use(plantsRoutes);
app.use(terrainsRoutes);
app.use(usersRoutes);
app.use(trackingRoutes);
app.use(feedbackRoutes);


app.get("/", (req, res) => {
  res.send("Animal Cardom");
});

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to '${db.name}' db`));

app.listen(PORT, () => console.log(`On port ${PORT}`));
