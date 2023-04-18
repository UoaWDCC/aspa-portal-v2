import express from "express";
import * as Event from "../controllers/event";

const router = express.Router();

router.get("/", Event.getEvents);
router.get("/:eventId", Event.getEvent);
router.post("/", Event.createEvent);
router.patch("/:eventId", Event.updateEvent);
router.patch("/registerUser/:eventId", Event.registerUser);
router.patch("/removeUser/:eventId", Event.removeUser);
router.delete("/:eventId", Event.deleteEvent);

export default router;
