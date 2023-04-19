import express from "express";
import { registerUserEvent, removeRegistration } from "../controllers/register";

const router = express.Router();

router.post("/", registerUserEvent);
router.delete("/:userId/:eventId", removeRegistration);

export default router;
