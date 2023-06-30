import express from "express";
import * as Event from "./event-controller";

const router = express.Router();

router.get("/", Event.getEvents);
router.get("/:eventId", Event.getEvent);
router.post("/", Event.createEvent);
router.patch("/:eventId", Event.updateEvent);
router.delete("/:eventId", Event.deleteEvent);

export default router;
