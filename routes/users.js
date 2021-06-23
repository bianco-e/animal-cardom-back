const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { defaultOkResponse, defaultErrorResponse } = require("../utils");

router.post("/users/create", (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, createdUser) => {
    if (err) return console.error("Error creating new user", err);
    defaultOkResponse(res, createdUser);
  });
});

router.post("/users/me", (req, res) => {
  const { auth_id } = req.body;
  User.findOne({ auth_id }, (err, doc) => {
    if (err) return console.error(`Error getting user data: ${err}`);
    if (doc) {
      defaultOkResponse(res, doc);
    } else defaultErrorResponse(res, "User not found", "user_not_found");
  });
});

router.post("/users/profile", (req, res) => {
  const { auth_id } = req.body;
  const query = User.findOne({ auth_id }).select([
    "xp",
    "owned_cards",
    "hand",
    "coins",
  ]);
  query.exec((err, doc) => {
    if (err) return console.error(`Error getting user profile: ${err}`);
    if (doc) {
      defaultOkResponse(res, doc);
    } else defaultErrorResponse(res, "User not found", "user_not_found");
  });
});

router.post("/users/hand/update", (req, res) => {
  const { auth_id, hand } = req.body;
  const query = User.findOneAndUpdate({ auth_id }, { hand }, { new: true });
  query.exec((err, doc) => {
    if (err) return console.error(`Error updating user hand: ${err}`);
    if (doc) {
      defaultOkResponse(res, doc.hand);
    } else
      defaultErrorResponse(res, "Error updating user hand", "hand_not_updated");
  });
});

router.post("/users/owned_cards/add", (req, res) => {
  const { auth_id, new_card } = req.body;
  User.updateOne(
    { auth_id },
    { $push: { owned_cards: new_card } },
    { new: true, upsert: true }
  ).exec((err, userDoc) => {
    if (err) return console.error(err);
    defaultOkResponse(res, new_card);
  });
});

router.post("/users/animal_purchase", (req, res) => {
  const { auth_id, new_card, price } = req.body;
  User.updateOne(
    { auth_id },
    { $push: { owned_cards: new_card }, $inc: { coins: -price } },
    { new: true, upsert: true }
  ).exec((err, userDoc) => {
    if (err) return console.error(err);
    defaultOkResponse(res, { new_card: new_card });
  });
});

module.exports = router;
