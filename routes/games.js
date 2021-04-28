const express = require("express");
const router = express.Router();
const AnimalCard = require("../models/AnimalCard");
const PlantCard = require("../models/PlantCard");
const User = require("../models/User");
const { GameModel: Game } = require("../models/Game");
const { defaultOkResponse } = require("../utils");
const { campaignPcAnimals } = require("../utils/constants");

//refactor this query
router.get("/games/new-random", (req, res) => {
  AnimalCard.aggregate([{ $sample: { size: 10 } }]).exec(
    (animalsErr, animalsDocs) => {
      if (animalsErr)
        return console.error("Error getting random initial hands", animalsErr);
      PlantCard.aggregate([{ $sample: { size: 6 } }]).exec(
        (plantsErr, plantsDocs) => {
          if (plantsErr)
            return console.error(
              "Error getting random initial hands",
              plantsErr
            );
          const response = {
            user: {
              animals: animalsDocs.slice(0, 5),
              plants: plantsDocs.slice(0, 3),
            },
            pc: {
              animals: animalsDocs.slice(5),
              plants: plantsDocs.slice(3),
            },
          };
          defaultOkResponse(res, response);
        }
      );
    }
  );
});

//refactor this query
router.get("/games/new-campaign", (req, res) => {
  const { xp, user_cards } = req.query;
  const userCards = user_cards.split(";");
  PlantCard.aggregate([{ $sample: { size: 6 } }]).exec(
    (plantsErr, plantsDocs) => {
      if (plantsErr)
        return console.error("Error getting random initial plants", plantsErr);
      AnimalCard.find({
        name: { $in: campaignPcAnimals[xp] },
      }).exec((pcAnimalsErr, pcAnimals) => {
        if (pcAnimalsErr)
          return console.error(
            "Error getting pc initial hand for campaign",
            pcAnimalsErr
          );
        AnimalCard.find({
          name: { $in: userCards },
        }).exec((userAnimalsErr, userAnimals) => {
          if (userAnimalsErr)
            return console.error(
              "Error getting pc initial hand for campaign",
              userAnimalsErr
            );
          const response = {
            user: {
              animals: userAnimals,
              plants: plantsDocs.slice(0, 3),
            },
            pc: {
              animals: pcAnimals,
              plants: plantsDocs.slice(3),
            },
          };
          defaultOkResponse(res, response);
        });
      });
    }
  );
});

router.post("/games/save-game", (req, res) => {
  const { game, auth_id } = req.body;
  const { xp_earned } = game;
  Game.updateOne(
    { auth_id },
    { $push: { games: game } },
    { new: true, upsert: true }
  ).exec((err, gameDoc) => {
    if (err) return console.error(err);
    User.findOneAndUpdate(
      { auth_id },
      { $inc: { xp: xp_earned } },
      { new: true }
    ).exec((err, userDoc) => {
      if (err) return console.error(err);
      defaultOkResponse(res, { xp: userDoc.xp });
    });
  });
});

router.post("/games/last-games", (req, res) => {
  const { auth_id } = req.body;
  const { quantity } = req.query;
  const query = Game.findOne({ auth_id }).select({
    games: { $slice: parseInt(quantity) },
  });
  query.exec((err, doc) => {
    if (err) return console.error(err);
    defaultOkResponse(res, {
      games: doc.games.sort((a, b) => b.created_at - a.created_at),
    });
  });
});

module.exports = router;
