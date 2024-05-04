const express = require("express");
const serviceController = require("../controllers/serviceController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllService/:id",
  jwtAuth,
  authorize("manager", "customer", "admin"),
  serviceController.getAllService
);
router.get(
  "/getSubService/:id",
  jwtAuth,
  authorize("manager", "customer", "admin", "mechanic"),
  serviceController.getSubService
);
router.post(
  "/create",
  jwtAuth,
  authorize("manager"),
  serviceController.createService
);
router.post(
  "/add/:id",
  jwtAuth,
  authorize("admin"),
  serviceController.addService
);

router.delete(
  "/deleteService/:id",
  jwtAuth,
  authorize("manager"),
  serviceController.deleteService
);
router.delete(
  "/deleteSubService/:id",
  jwtAuth,
  authorize("manager"),
  serviceController.deleteSubService
);
router.patch(
  "/:id",
  jwtAuth,
  authorize("manager", "admin"),
  serviceController.updateService
);
module.exports = router;
