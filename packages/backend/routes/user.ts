import express from "express";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    addEvent,
    deleteUser
} from "../controllers/user";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.patch("/addevent/:userId", addEvent);
router.delete("/:userId", deleteUser);

export default router;
