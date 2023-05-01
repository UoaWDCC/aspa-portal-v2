import express from "express";
import {
  registerUserEvent,
  removeRegistration,
  updatePaymentStatus,
} from "./register-controller";
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// verify the token for all register routes
router.use(verifyToken);

router.post("/", registerUserEvent);
router.delete("/:userId/:eventId", removeRegistration);
router.patch("/status/:userId/:eventId", updatePaymentStatus);

export default router;
