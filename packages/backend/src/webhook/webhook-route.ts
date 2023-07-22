import express from "express";
import { handleWebhooks } from "./webhook-controller"

const router = express.Router();

// N.B. it's important to use raw, not json, so that we can check to make sure stripe has signed the webhook.
router.post('/', express.raw({ type: "application/json" }), handleWebhooks);

export default router;