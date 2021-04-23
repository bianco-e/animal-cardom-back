const express = require("express");
const router = express.Router();
const PlantCard = require("../models/PlantCard");

router.get("/plants/all", (req, res) => {
  PlantCard.find({}).exec((err, docs) => {
    if (err) return console.error("Error getting all animals", err);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({ plants: docs });
    res.end();
  });
});

router.post("/plants/create", (req, res) => {
  const newPlant = new PlantCard(req.body);
  newPlant.save((err, createdPlantCard) => {
    if (err) return console.error("Error creating new plant card", err);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(`New card created: ${createdPlantCard}`);
    res.end();
  });
});

router.post("/plants/create-many", (req, res) => {
  const plantsCardsArray = req.body;
  PlantCard.create(plantsCardsArray).exec((err, docs) => {
    if (err) return console.error("Error creating many plants cards", err);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(`${plantsCardsArray.length} cards created`);
    res.end();
  });
});

module.exports = router;
