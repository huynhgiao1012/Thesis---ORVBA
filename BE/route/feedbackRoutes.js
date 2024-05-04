const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllFeedbacks/:id",
  jwtAuth,
  authorize("manager", "customer"),
  feedbackController.getAllFeedback
);
router.get(
  "/getAllFeedbackByCus",
  jwtAuth,
  authorize("customer"),
  feedbackController.getAllFeedbackByCus
);
router.post(
  "/create",
  jwtAuth,
  authorize("customer"),
  feedbackController.createFeedback
);
// router.delete(
//   "/:id",
//   jwtAuth,
//   authorize("company"),
//   feedbackController.deleteFeedback
// );

module.exports = router;
