import express from "express";
import {
  registerUserEvent,
  removeRegistration,
  updateIsPaid,
} from "./register-controller";

const router = express.Router();

router.post("/", registerUserEvent);
router.delete("/:userFbId/:eventId", removeRegistration);
router.patch("/status/:userId/:eventId", updateIsPaid);

export default router;
