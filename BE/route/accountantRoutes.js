const express = require("express");
const accountantController = require("../controllers/accountantController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/updateDone/:id",
  jwtAuth,
  authorize("accountant"),
  accountantController.updateDone
);
router.post(
  "/addCarSpares",
  jwtAuth,
  authorize("accountant"),
  accountantController.addCarSpares
);
router.post(
  "/updateCarSpares/:id",
  jwtAuth,
  authorize("accountant"),
  accountantController.updateCarSpares
);
router.post(
  "/addSubCarSpares",
  jwtAuth,
  authorize("accountant"),
  accountantController.addSubCarSpare
);
router.get(
  "/getUnPaidForms",
  jwtAuth,
  authorize("accountant"),
  accountantController.getUnPaidForms
);
router.get(
  "/getAllCarSpares",
  jwtAuth,
  authorize("accountant"),
  accountantController.getAllCarSpares
);
module.exports = router;
