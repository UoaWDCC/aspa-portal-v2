import express from "express";
import * as Event from "./event-controller";

const router = express.Router();

router.get("/", Event.getEvents);
router.get("/:eventId", Event.getEvent);
router.post("/", Event.createEvent);
router.patch("/:eventId", Event.updateEvent);
router.delete("/:eventId", Event.deleteEvent);
router.get("/usersInfo/:eventId", Event.getEventUsersInfo);

export default router;
