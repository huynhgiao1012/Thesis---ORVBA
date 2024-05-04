const express = require("express");
const notiController = require("../controllers/notiController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getUnreadNotification",
  jwtAuth,
  authorize("manager", "customer"),
  notiController.getUnreadNotification
);
router.get(
  "/getReadNotification",
  jwtAuth,
  authorize("manager", "customer"),
  notiController.getReadNotification
);
router.post(
  "/create",
  jwtAuth,
  authorize("manager", "customer"),
  notiController.createNotification
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("manager", "customer"),
  notiController.deleteNotification
);
router.patch(
  "/updateNoti/:id",
  jwtAuth,
  authorize("manager", "customer"),
  notiController.updateNotification
);
module.exports = router;
