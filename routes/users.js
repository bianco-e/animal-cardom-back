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
  const query = User.findOne({ auth_id }).select(["xp", "owned_cards", "hand"]);
  query.exec((err, doc) => {
    if (err) return console.error(`Error getting user profile: ${err}`);
    if (doc) {
      defaultOkResponse(res, doc);
    } else defaultErrorResponse(res, "User not found", "user_not_found");
  });
});

module.exports = router;
