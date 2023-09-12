import express from "express";
import * as User from "./user-controller";

const router = express.Router();

router.get("/", User.getUsers);
router.get("/getUserId", User.getUserId);
router.get("/points", User.getUserPoints);
router.get("/:userId", User.getUser);
router.get("/fbId/:firebaseId", User.getUserByFirebaseId);
router.get("/userEvents/:userId", User.getUserEvents);
router.post("/", User.createUser);
router.patch("/:userId", User.updateUser);
router.patch("/points/remove", User.removeUserPoints);
router.patch("/points/add", User.addUserPoints);
router.patch("/admin/:userId", User.makeUserAdmin);
router.delete("/:userId", User.deleteUser);

export default router;
