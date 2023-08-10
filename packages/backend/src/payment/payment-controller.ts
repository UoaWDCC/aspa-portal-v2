import { Request, Response } from "express";
import { Event } from "../event/event-model";
import { User } from "../user/user-model";
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
  if (!req.params.eventId) {
    res.status(400).json("Missing req.params.eventId");
    return;
  }
  if (!req.params.userId) {
    res.status(400).json("Missing req.params.userId");
    return;
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new Error(`User ${req.params.userId} not found`);
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      throw new Error(`Event ${req.params.eventId} not found`);
    }

    const productId = event.stripeProductId;
    if (!productId) {
      throw new Error(
        `Event ${event.id} does not have an associated stripe product id`
      );
    }

    const product = await stripe.products.retrieve(productId);
    if (!product.default_price) {
      throw new Error(
        `Event ${event.id} does not have an associated default price`
      );
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          // there is an adjustable quantity option btw
          price: product.default_price.toString(),
          quantity: 1,
        },
      ],
      success_url: "https://google.com", // TODO : significant URL eg 'https://your-frontend-url.com/payment-success?session_id={CHECKOUT_SESSION_ID}'
      cancel_url: "https://google.com", // TODO : significant URL eg 'https://your-frontend-url.com/payment-cancel',
      mode: "payment",
      metadata: {
        userId: user.id,
        eventId: event.id,
        registrationDate: Date.now(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        paymentType: req.body.paymentType,
      },
    });

    // redirect customer to url from checkout session
    const payment_page = session.url;
    if (!payment_page) {
      const err = new Error("No payment page presented");
      res.status(400).json(err);
      return;
    }

    res.status(200).json({
      redirect: payment_page,
      sessionId: session.id,
    });
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};
