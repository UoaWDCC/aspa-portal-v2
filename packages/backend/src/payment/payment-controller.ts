import { Request, Response } from "express";
import { Event } from "../event/event-model";
import { registerUserEvent } from '../register/register-controller'
import { User } from "../user/user-model";
import assert from "node:assert/strict"

import dotenv from "dotenv";

const conf = dotenv.config();
if (conf.error) {
    throw conf.error;
}

if (!process.env.STRIPE_SECRET_KEY)
    throw new Error("Stripe publishable key not found");
// console.log(`${process.env.STRIPE_SECRET_KEY}`)

import Stripe from "stripe";
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: '2022-11-15' });


/**
 * Backend controller for Stripe Checkout.
 */
export const checkout = async (req: Request, res: Response) => {

    assert(req.params.eventId, "Missing req.params.eventId");
    assert(req.params.userId, "Missing req.params.userId")

    // Retrieve the event data from MongoDB
    const event = await Event.findById(req.params.eventId);

    if (!event) {
        throw new Error("Event does not exist");
    }

    const product = await stripe.products.retrieve(
        event.stripeProductId
    );

    if (!product.default_price) {
        console.log(product)
        throw new Error("Event does not have an associated default price");
    }

    // Create a Stripe Checkout Session
    await stripe.checkout.sessions.create({
        payment_method_types: ['card'],

        line_items: [{
            // there is an adjustable quantity option
            price: product.default_price.toString(),
            quantity: 1,
        }],

        success_url: 'https://google.com', // TODO : significant URL eg 'https://your-frontend-url.com/payment-success?session_id={CHECKOUT_SESSION_ID}'
        cancel_url: 'https://google.com', // TODO : significant URL eg 'https://your-frontend-url.com/payment-cancel',

        mode: 'payment',
    }).then(async (session) => {
        if (session.payment_status === 'unpaid') {
            res.status(400).json({ message: 'Payment failed' });
            return;
        }

        // prep req for registerUserEvent()
        // ! we should decide on a standard of whether userId and eventId should be in the body or params
        req.body.userId = req.params.userId;
        req.body.eventId = req.params.eventId;
        req.body.registrationDate = Date.now();
        req.body.paid = true;
        req.body.paymentDetails = "card";

        await registerUserEvent(req, res)
            .then(async () => {

                const { userId } = req.params;
                const paid = true;

                // Check if user is registered under the event
                const eventData = await Event.findOne({
                    _id: req.params.eventId,
                    users: { $elemMatch: { userId: userId } },
                });

                // If registration already exists, update paid status, otherwise return error
                if (eventData != null) {
                    await Event.updateOne(
                        {
                            _id: req.params.eventId,
                            "users.userId": userId,
                        },
                        {
                            $set: { "users.$.paid": paid },
                        }
                    );

                    await User.updateOne(
                        {
                            _id: userId,
                            "events.eventId": req.params.eventId,
                        },
                        {
                            $set: { "events.$.paid": paid },
                        }
                    );
                    res.status(200).json({
                        message: "Paid status has been updated",
                    });
                } else {
                    throw new Error("Unable to update registration, it does not exist");
                }
            }).catch((error) => {
                console.error(error);
                res.status(400).json(error);
                return;
            });

        return res.status(200).json({ sessionId: session.id });

    }).catch((error) => {
        console.error(error);
        res.status(400).json(error);
        return;
    })
}