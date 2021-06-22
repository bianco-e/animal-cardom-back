const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const { defaultOkResponse, defaultErrorResponse } = require("../utils");

router.post("/give_feedback", (req, res) => {
  const newFeedback = new Feedback({...req.body, created_at: new Date().getTime()});
  newFeedback.save((err, createdFeedback) => {
    if (err) return defaultErrorResponse(res, "Feedback message not saved", "feedback_message_not_saved");
    defaultOkResponse(res, createdFeedback);
  });
});


module.exports = router;