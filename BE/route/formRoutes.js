const express = require("express");
const formController = require("../controllers/orderFormController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllFormCustomer",
  jwtAuth,
  authorize("customer"),
  formController.getAllFormByCustomer
);
router.get(
  "/getAllFormGarage",
  jwtAuth,
  authorize("company"),
  formController.getAllFormByGarage
);
router.get(
  "/getAllFormAdmin",
  jwtAuth,
  authorize("admin"),
  formController.getAllFormAdmin
);
router.get(
  "/getFormNotFeed",
  jwtAuth,
  authorize("customer"),
  formController.getFormNotFeed
);
router.get(
  "/getFormFeed",
  jwtAuth,
  authorize("customer"),
  formController.getFormFeed
);
router.get(
  "/getAllForm/:id",
  jwtAuth,
  authorize("admin"),
  formController.getAllForm
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("company", "customer"),
  formController.deleteForm
);
router.get(
  "/getFormDetail/:id",
  jwtAuth,
  authorize("mechanic", "customer"),
  formController.getFormDetail
);
router.patch(
  "/updateProcess/:id",
  jwtAuth,
  authorize("company"),
  formController.updateProcessForm
);
router.patch(
  "/updateDone/:id",
  jwtAuth,
  authorize("company"),
  formController.updateDoneForm
);
router.post(
  "/intent",
  jwtAuth,
  authorize("customer"),
  formController.paymentIntent
);
router.patch(
  "/payment/:id",
  jwtAuth,
  authorize("customer"),
  formController.payment
);
module.exports = router;
