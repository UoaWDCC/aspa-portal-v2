import express from "express";
import { checkout } from "./payment-controller";

const router = express.Router();

router.post('/create-checkout-session/:userId/:eventId', checkout); // nosonar: returns Promise<void> because function is async

export default router;


