import express from "express";
import * as User from "../controllers/user.js";

const router = express.Router();

router.get("/", User.getUsers);
router.get("/:userId", User.getUser);
router.post("/", User.createUser);
router.patch("/:userId", User.updateUser);
router.patch("/addevent/:userId", User.addEvent);
router.delete("/:userId", User.deleteUser);

export default router;
