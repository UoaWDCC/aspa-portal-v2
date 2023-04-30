import express from "express";
import {
  registerUserEvent,
  removeRegistration,
  updatePaid,
} from "./register-controller";

const router = express.Router();

router.post("/", registerUserEvent);
router.delete("/:userId/:eventId", removeRegistration);
router.patch("/status/:userId/:eventId", updatePaid);

export default router;
