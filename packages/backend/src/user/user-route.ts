import express from "express";
import {
  getUsers,
  getUser,
  getUserId,
  getUserByFirebaseId,
  createUser,
  updateUser,
  deleteUser,
  makeUserAdmin,
} from "./user-controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/getUserId", getUserId);
router.get("/:userId", getUser);
router.get("/fbId/:firebaseId", getUserByFirebaseId);
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.patch("/admin/:userId", makeUserAdmin);
router.delete("/:userId", deleteUser);

export default router;
