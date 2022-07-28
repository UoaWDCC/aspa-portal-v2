import express from "express";
import * as User from "../controllers/user.js";

const router = express.Router();

router.get("/", User.getUser);

export default router;
