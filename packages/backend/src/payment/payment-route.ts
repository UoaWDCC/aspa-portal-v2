import express from "express";
import { checkout } from "./payment-controller";

const router = express.Router();

router.post('/create-checkout-session', checkout);

export default router;


