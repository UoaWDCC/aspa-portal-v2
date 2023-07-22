/**
 * webhook-controller.ts
 * Basic skeleton function for handling webhooks received from stripe.
 * Business logic goes in the switch statement.
 * 
 * @author Noam Bechhofer
 */

import { Request, Response } from "express";
import Stripe from "stripe"
import dotenv from "dotenv"


/**
 * Handle stripe webhooks
 * 
 * @param req http request
 * @param res http response
 */
export const handleWebhooks = async (req: Request, res: Response) => {
    dotenv.config();

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET_KEY) {
        throw new Error(
            "STRIPE_SECRET_KEY not set in .env. " +
            "Retrieve an API key from https://dashboard.stripe.com/apikeys."
        );
    }
    const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
    if (!STRIPE_WEBHOOK_SECRET) {
        throw new Error(
            "STRIPE_WEBHOOK_SECRET not set in .env. " +
            "Retrieve the endpoint secret from https://dashboard.stripe.com/webhooks, " +
            "or if working locally, from the 'stripe listen' shell command."
        );
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

    const signature = req.headers["stripe-signature"];
    if (!signature) {
        throw new Error("missing stripe-signature header");
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        let error = err as Stripe.errors.StripeSignatureVerificationError;
        console.log(error.message);
        res.status(403).send(`Stripe webhook signature verification failed.`);
        return;
    }

    /*
     * Implement business logic within this switch statement.
     * For a list of webhook events available, use this CLI command:
     *     $ stripe trigger --help
     * "stripe trigger" can also be used to simulate webhook events, which is 
     * very useful for testing. See https://stripe.com/docs/webhooks/test for 
     * instructions on how to do this.
     * See also: https://stripe.com/docs/api/events/types
     * 
     * - Noam
     */
    switch (event.type) {
        /* 
         * // e.g. to handle the checkout.session.completed webhook, use:
         * case "checkout.session.completed":
         *     // insert business logic here, or better yet, write a new function and call it here.
         *     break;
         */
        default:
            break;
    }

    res.status(200).end();
};