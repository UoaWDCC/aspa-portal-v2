import { Request, Response } from "express";
import Stripe from "stripe"
import dotenv from "dotenv"


/**
 * Handle stripe webhooks
 * @param req 
 * @param res 
 */
export const confirmPaid = async (req: Request, res: Response) => {
    dotenv.config();

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY not set");
    }
    const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
    if (!STRIPE_WEBHOOK_SECRET) {
        throw new Error("STRIPE_WEBHOOK_SECRET not set");
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

    let event: Stripe.Event = req.body;
    // try {
    //     const signature = req.headers["stripe-signature"];
    //     if (!signature) {
    //         throw new Error("missing stripe-signature header");
    //     }
    //     event = stripe.webhooks.constructEvent(
    //         req.body,
    //         signature,
    //         STRIPE_WEBHOOK_SECRET
    //     );
    // } catch (err) {
    //     console.log(err);
    //     res.status(400).json("Verification failed");
    //     return;
    // }

    switch (event.type) {
        case "payment_intent.succeeded":
            console.log(event);
            break;
        default:
            console.log("unhandled stripe webhook: '" + event.type + "'");
            break;
    }

    res.status(200);
};