import express from "express";
import * as Event from "../controllers/event.js";

const router = express.Router();

router.get("/", Event.getEvents);

export default router;
