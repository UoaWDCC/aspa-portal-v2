import express from "express";
import * as Event from "../controllers/event.js";

const router = express.Router();

router.get("/", Event.getEvents);
router.post("/", Event.createEvent);
router.patch("/:eventId", Event.updateEvent);

export default router;
