import { Request, Response } from "express";
import { Event } from "../event/event-model";
import { registerUserEvent, updatePaid } from '../register/register-controller'

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


export const checkout = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    // Retrieve the event data from MongoDB
    const event = await Event.findById(eventId);

    if (!event) {
        throw new Error("Event doesn't exist");
    }

    const product = await stripe.products.retrieve(
        event.stripeProductId
    );

    if (!product.default_price) {
        console.log(product)
        throw new Error("Event does not have an associated default price");
    } 

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],

        line_items: [{
            // there is an adjustable quantity option
            price: product.default_price.toString(),
            quantity: 1,
        }],

        success_url: 'https://google.com', // TODO : significant URL eg 'https://your-frontend-url.com/payment-success?session_id={CHECKOUT_SESSION_ID}'
        cancel_url: 'https://google.com', // TODO : significant URL eg 'https://your-frontend-url.com/payment-cancel',

        mode: 'payment',
    });

    if (session.payment_status === 'unpaid') {
        return res.status(400).json({ message: 'Payment failed' });
    }

    try {
        req.body.userId = req.params.userId;
        req.body.eventId = req.params.eventId;

        req.body.registrationDate = Date.now();
        req.body.paid = true;
        req.body.paymentDetails = "card";

        await registerUserEvent(req, res);
        updatePaid(req, res);
        return res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
}