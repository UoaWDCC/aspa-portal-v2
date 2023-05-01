import express from "express";
import {
  registerUserEvent,
  removeRegistration,
  updatePaymentStatus,
} from "./register-controller";
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/", verifyToken, registerUserEvent);
router.delete("/:userId/:eventId", removeRegistration);
router.patch("/status/:userId/:eventId", updatePaymentStatus);

export default router;
