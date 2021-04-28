const express = require("express");
const router = express.Router();
const Terrain = require("../models/Terrain");
const { defaultOkResponse } = require("../utils");

router.get("/terrains/all", (req, res) => {
  Terrain.find({}).exec((err, docs) => {
    if (err) return console.error("Error getting all terrains", err);
    defaultOkResponse(res, { terrains: docs });
  });
});

router.get("/terrains/new", (req, res) => {
  const { name } = req.query;
  if (name) {
    Terrain.findOne({ name: { $regex: name, $options: "i" } }).exec(
      (err, terrain) => {
        if (err)
          return console.error(`Error getting ${req.query.name} terrain`, err);
        defaultOkResponse(res, terrain);
      }
    );
  } else {
    Terrain.aggregate([{ $sample: { size: 1 } }]).exec((err, terrain) => {
      if (err) return console.error("Error getting random terrain", err);
      defaultOkResponse(res, terrain[0]);
    });
  }
});

router.post("/terrains/create-many", (req, res) => {
  const terrainsArray = req.body;
  Terrain.create(terrainsArray).exec((err, docs) => {
    if (err) return console.error("Error creating many terrains", err);
    defaultOkResponse(res, `${terrainsArray.length} terrains created`);
  });
});

module.exports = router;
