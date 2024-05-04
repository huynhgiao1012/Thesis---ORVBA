const express = require("express");
const userController = require("../controllers/userController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.post("/updatePassword", jwtAuth, userController.updatePassword);
router.get(
  "/getAllUser",
  jwtAuth,
  authorize("admin"),
  userController.getAllUser
);
router.get("/detail/:id", jwtAuth, authorize("admin"), userController.getUser);
router.post(
  "/setInActive/:id",
  jwtAuth,
  authorize("admin"),
  userController.setInActive
);
router.get(
  "/userDetail",
  jwtAuth,
  authorize("customer", "manager", "mechanic", "accountant", "admin"),
  userController.getUserDetails
);

router.patch(
  "/",
  jwtAuth,
  authorize("admin", "customer", "manager", "mechanic", "accountant"),
  userController.updateUser
);

// router.delete("/:id", jwtAuth, authorize("admin"), userController.deleteUser);
module.exports = router;
