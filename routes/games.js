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
      const pcFilteredAnimals = campaignPcAnimals[xp]
        .filter((animal) => !userCards.includes(animal))
        .slice(0, 5);

      console.log({ pcFilteredAnimals });
      console.log({ campaignPcAnimals: campaignPcAnimals[xp] });

      AnimalCard.find({
        name: { $in: pcFilteredAnimals },
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
  const { xp_earned, earned_animal } = game;
  Game.updateOne(
    { auth_id },
    { $push: { games: { ...game, created_at: new Date().getTime() } } },
    { new: true, upsert: true }
  ).exec((err, gameDoc) => {
    if (err) return console.error(err);
    User.findOneAndUpdate(
      { auth_id },
      { $inc: { xp: xp_earned }, $push: { owned_cards: earned_animal } },
      { new: true }
    ).exec((err, userDoc) => {
      if (err) return console.error(err);
      defaultOkResponse(res, {
        xp: userDoc.xp,
        earned_animal: userDoc.owned_cards[userDoc.owned_cards.length - 1],
      });
    });
  });
});

router.post("/games/last-games", (req, res) => {
  const { auth_id } = req.body;
  const { quantity } = req.query;
  const docsNumber = quantity ? parseInt(quantity) : 20;
  Game.aggregate([
    {
      $match: {
        auth_id,
      },
    },
    { $unwind: "$games" },
    {
      $sort: {
        "games.created_at": 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        games: {
          $push: "$games",
        },
      },
    },
  ]).exec((err, doc) => {
    if (err) return console.error(err);
    defaultOkResponse(
      res,
      doc.length > 0 ? doc[0].games.slice(0, docsNumber) : []
    );
  });
});

module.exports = router;
