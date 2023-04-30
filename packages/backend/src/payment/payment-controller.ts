import { Request, Response } from "express";
import { Event } from "../event/event-model";
import { registerUserEvent, updatePaid } from '../register/register-controller'

import Stripe from "stripe";
const stripe = new Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`, { apiVersion: '2022-11-15' });


export const checkout = async (req: Request, res: Response) => {
    const { eventId, userId /*, token */ } = req.body;

    // Retrieve the event data from MongoDB
    const event = await Event.findById(eventId);

    if (!event) {
        throw new Error("Event doesn't exist");
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],

        line_items: [{
            price: event.stripeProductId,
            quantity: 1,
        }],

        success_url: 'localhost:5000/', // TODO : significant URL eg 'https://your-frontend-url.com/payment-success?session_id={CHECKOUT_SESSION_ID}'
        cancel_url: 'localhost:5000/', // TODO : significant URL eg 'https://your-frontend-url.com/payment-cancel',

        mode: 'payment',
    });
    res.json({ sessionId: session.id });

    if (session.payment_status === 'unpaid') {
        res.status(400).json({ message: 'Payment failed' });
        return;
    }

    try {
        await registerUserEvent(eventId, userId /*, token */);

        req.body.paid = true;
        updatePaid(req, res);
        return res.status(200)
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
}