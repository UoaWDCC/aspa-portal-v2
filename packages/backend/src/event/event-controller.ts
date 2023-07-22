import { Event } from "./event-model";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Stripe from "stripe";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(404).json({ error: "No such event" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "No such event" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    if (
      req.body.eventTitle &&
      req.body.eventDescription &&
      req.body.eventLocation &&
      req.body.eventTime
    ) {
      // Create product on stripe for the event
      const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
        apiVersion: "2022-11-15",
      });
      const product = await stripe.products.create({
        name: req.body.eventTitle,
        description: req.body.eventDescription,
      });
      const productId = product.id;
      const price = await stripe.prices.create({
        product: productId,
        currency: "nzd",
        unit_amount: 600, // Adjust the price amount in cents (e.g. 600 = $6)
      });
      await stripe.products.update(productId, {
        default_price: price.id,
      });
      console.log("\nProduct id: " + productId);

      // Create event on mongodb
      const event = new Event({
        eventTitle: req.body.eventTitle,
        eventDescription: req.body.eventDescription,
        eventLocation: req.body.eventLocation,
        eventTime: new Date(req.body.eventTime),
        stripeProductId: productId,
      });
      await event.save();
      res.status(201).json(event);
    } else {
      return res.status(400).json({ error: "Please fill in all the fields" });
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const eventData = await Event.findById(eventId);
    if (eventData != null) {
      const event = await Event.findByIdAndUpdate(
        { _id: eventId },
        {
          eventTitle:
            req.body.eventTitle != ""
              ? req.body.eventTitle
              : eventData.eventTitle,
          eventDescription:
            req.body.eventDescription != ""
              ? req.body.eventDescription
              : eventData.eventDescription,
          eventLocation:
            req.body.eventLocation != ""
              ? req.body.eventLocation
              : eventData.eventLocation,
          eventTime:
            req.body.eventTime != "" ? req.body.eventTime : eventData.eventTime,
          stripeProductId: eventData.stripeProductId,
        }
      );

      res.status(200).json(event);
    } else {
      return res.status(404).json({ error: "No such event" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndDelete({ _id: eventId });

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

/**
 * Get users info for a particular event
 * This returns an event object, with a new property finalUsersInfo (array), which contains the users info and corresponding event registration details)
 */
export const getEventUsersInfo = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(404).json({ error: "No such event" });
    }

    const eventIdObject = new mongoose.Types.ObjectId(eventId);

    const event = await Event.aggregate([
      { $match: { _id: eventIdObject } },
      {
        $lookup: {
          from: "users",
          localField: "users.userId",
          foreignField: "_id",
          as: "usersInfo",
        },
      },
      {
        $addFields: {
          finalUsersInfo: {
            $map: {
              input: "$users",
              as: "user",
              in: {
                $mergeObjects: [
                  "$$user",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$usersInfo",
                          cond: { $eq: ["$$this._id", "$$user.userId"] },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          usersInfo: 0,
        },
      },
    ]);

    if (!event || event.length == 0) {
      return res.status(404).json({ error: "No such event" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.log(error);
  }
};