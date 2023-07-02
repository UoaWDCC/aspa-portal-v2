import { Request, Response } from "express";
import { Event } from "../event/event-model";
import { User } from "../user/user-model";
import assert from "node:assert/strict"
import Stripe from "stripe";

import dotenv from "dotenv";

const conf = dotenv.config();
if (conf.error) {
    throw conf.error;
}

const secret = process.env.STRIPE_SECRET_KEY;
if (!secret)
    throw new Error("Stripe secret key not found. Please update .env file.");
const stripe = new Stripe(secret, { apiVersion: "2022-11-15" });

/**
 * Backend controller for Stripe Checkout.
 */
export const checkout = async (req: Request, res: Response) => {

    assert(req.params.eventId, "Missing req.params.eventId");
    assert(req.params.userId, "Missing req.params.userId");

    await User.findById(req.params.userId).catch((err) => {
        throw err;
    });

    await Event.findById(req.params.eventId)
        .then(async (event) => {
            if (!event) {
                throw new Error("event not found");
            }

            const product = event.stripeProductId;
            if (!product) {
                res.status(400).json("event must have an associated stripe product id");
                return;
            }
            
            await stripe.products.retrieve(product)
                .then(async (product) => {

                    if (!product.default_price) {
                        throw new Error("Event does not have an associated default price");
                    }

                    // Create a Stripe Checkout Session
                    await stripe.checkout.sessions.create({
                        payment_method_types: ['card'],

                        line_items: [{
                            // there is an adjustable quantity option btw
                            price: product.default_price.toString(),
                            quantity: 1,
                        }],

                        success_url: 'https://google.com', // TODO : significant URL eg 'https://your-frontend-url.com/payment-success?session_id={CHECKOUT_SESSION_ID}'
                        cancel_url: 'https://google.com', // TODO : significant URL eg 'https://your-frontend-url.com/payment-cancel',

                        mode: 'payment',
                    }).then(async (session) => {
                        // redirect customer to url from checkout session
                        const payment_page = session.url;
                        if (!payment_page) {
                            const err = new Error("No payment page presented");
                            res.status(400).json(err);
                            return;
                        }

                        res.status(200).json({
                            "redirect": payment_page,
                            "sessionId": session.id
                        })
                    }).catch((error) => {
                        console.error(error);
                        res.status(400).json(error);
                    })
                });
        })
        .catch((err) => {
            throw err;
        });
}