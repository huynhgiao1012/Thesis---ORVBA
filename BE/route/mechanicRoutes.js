const express = require("express");
const mechanicController = require("../controllers/mechanicController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/pickForm/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.pickForm
);
router.post(
  "/updateBefore/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.updateBefore
);
router.post(
  "/updateFinish/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.updateFinish
);
router.get(
  "/getForms",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getForms
);
router.get(
  "/getHoldingForms",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getHoldingForms
);
router.get(
  "/getPayInfo/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getPayInfo
);
router.get(
  "/getPickedForms",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getPickedForms
);
router.get(
  "/getMePoint",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getMePoint
);
router.get(
  "/getCarSparesMe",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getAllCarSpares
);
router.get(
  "/getAllService",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getAllService
);
router.get(
  "/getGarageStaff",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getGarageStaff
);
router.get(
  "/getCustomer/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getCustomer
);
router.get(
  "/getSubCarSpareMe/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getSubCarSpare
);

module.exports = router;
