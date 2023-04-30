import express from "express";
import { checkout } from "./payment-controller";

const router = express.Router();

router.post('/create-checkout-session/:userId/:eventId', checkout);

export default router;


