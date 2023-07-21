import express from "express";
import { confirmPaid } from "./webhook-controller"

const router = express.Router();

router.post('/payment_success', confirmPaid);

export default router;