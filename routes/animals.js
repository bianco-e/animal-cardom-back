const express = require("express");
const router = express.Router();
const AnimalCard = require("../models/AnimalCard");
const { defaultOkResponse } = require("../utils");

router.get("/animals/all", (req, res) => {
  AnimalCard.find({}).exec((err, docs) => {
    if (err) return console.error("Error getting all animals", err);
    defaultOkResponse(res, { animals: docs });
  });
});

router.get("/animals/newest", (req, res) => {
  AnimalCard.find({})
    .sort("-created_at")
    .limit(3)
    .exec((err, docs) => {
      if (err) return console.error("Error getting newest animals", err);
      defaultOkResponse(res, { animals: docs });
    });
});

router.get("/animals/filter", (req, res) => {
  const { species, owned, skill_type, owned_to_filter } = req.query;
  const ownedAnimals = owned && owned.split(";");
  const ownedAnimalsToFilter = owned_to_filter && owned_to_filter.split(";");
  AnimalCard.find({
    ...(ownedAnimals
      ? { name: { $in: ownedAnimals } }
      : ownedAnimalsToFilter
      ? { name: { $nin: ownedAnimalsToFilter } }
      : {}),
    ...(species ? { species } : {}),
    ...(skill_type ? { "skill.types": skill_type } : {}),
  }).exec((err, docs) => {
    if (err) return console.error("Error getting all animals", err);
    defaultOkResponse(res, { animals: docs });
  });
});

router.post("/animals/create", (req, res) => {
  const newCard = new AnimalCard({
    ...req.body,
    created_at: new Date().getTime(),
  });
  newCard.save((err, createdAnimalCard) => {
    if (err) return console.error("Error creating new animal card", err);
    defaultOkResponse(res, `New card created: ${createdAnimalCard}`);
  });
});

router.post("/animals/create-many", (req, res) => {
  const cardsArray = req.body.map((card) => ({
    ...card,
    created_at: new Date().getTime(),
  }));
  AnimalCard.create(cardsArray).exec((err, docs) => {
    if (err) return console.error("Error creating many animals cards", err);
    defaultOkResponse(res, `${cardsArray.length} cards created`);
  });
});

module.exports = router;
