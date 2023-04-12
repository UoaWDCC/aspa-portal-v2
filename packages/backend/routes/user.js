import express from "express";
import * as User from "../controllers/user.js";

const router = express.Router();

router.get("/", User.getUsers);                         // good
router.get("/:userId", User.getUser);                   // good
router.post("/", User.createUser);                      // good
router.patch("/:userId", User.updateUser);              // good
router.patch("/addevent/:userId", User.addEvent);
router.delete("/:userId", User.deleteUser);             // good

export default router;
