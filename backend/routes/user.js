import express from "express";
import * as User from "../controllers/user.js";

const router = express.Router();

router.get("/:email", User.getUser);
router.post("/", User.createUser); // register route
router.patch("/:email", User.editUser);

export default router;
