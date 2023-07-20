import express from "express";
import {
  getUsers,
  getUser,
  getUserByFirebaseId,
  createUser,
  updateUser,
  deleteUser,
} from "./user-controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.get("/:firebaseId", getUserByFirebaseId);
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
