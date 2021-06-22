const express = require("express");
const router = express.Router();
const Action = require("../models/Action");
const { defaultOkResponse, defaultErrorResponse } = require("../utils");

router.post("/track_action", (req, res) => {
  const newAction = new Action({...req.body, created_at: new Date().getTime()});
  newAction.save((err, createdAction) => {
    if (err) return defaultErrorResponse(res, "Action not tracked", "action_not_tracked");
    defaultOkResponse(res, createdAction);
  });
});


module.exports = router;