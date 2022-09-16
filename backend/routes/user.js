import express from "express";
import * as User from "../controllers/user.js";

const router = express.Router();

router.get("/", User.getUsers);
router.get("/:email", User.getUser);
router.post("/", User.createUser);
router.patch("/:email", User.editUser);

export default router;
