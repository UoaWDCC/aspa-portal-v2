import express from "express";
import * as User from "../controllers/user.js";
import passport from "passport";

const router = express.Router();

router.get("/", User.getUsers);
router.get("/:email", User.getUser);
router.post("/register", User.createUser); // register route
router.post("/login", passport.authenticate("local"), User.authenticateUser);
router.patch("/:email", User.editUser);
router.delete("/", User.deleteUsers);
router.delete("/:email", User.deleteUser);

export default router;
