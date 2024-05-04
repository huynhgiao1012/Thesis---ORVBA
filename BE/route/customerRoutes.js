const express = require("express");
const customerController = require("../controllers/customerController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.get(
  "/customerDetail",
  jwtAuth,
  authorize("customer"),
  customerController.getUserDetails
);
router.post(
  "/getAllFormTime/:id",
  jwtAuth,
  authorize("customer"),
  customerController.getAllFormTime
);
router.get(
  "/getAllForm",
  jwtAuth,
  authorize("customer"),
  customerController.getAllForm
);
router.get(
  "/getEmergencyForm",
  jwtAuth,
  authorize("customer"),
  customerController.getEmergencyForm
);
router.get(
  "/getMaintainForm",
  jwtAuth,
  authorize("customer"),
  customerController.getMaintainForm
);
router.get(
  "/customerPoint",
  jwtAuth,
  authorize("customer"),
  customerController.getUserPoint
);
router.get(
  "/getUnFeedForm",
  jwtAuth,
  authorize("customer"),
  customerController.getUnFeedForm
);
router.post(
  "/updateCustomerPoint",
  jwtAuth,
  authorize("customer"),
  customerController.updateCustomerPoint
);
router.post(
  "/bookingMaintenance",
  jwtAuth,
  authorize("customer"),
  customerController.bookingMaintenance
);
module.exports = router;
