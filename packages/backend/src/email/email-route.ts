import express from "express";
import * as Email from "./email-controller";

const router = express.Router();

router.get("/", Email.sendEmailHandler);

export default router;
