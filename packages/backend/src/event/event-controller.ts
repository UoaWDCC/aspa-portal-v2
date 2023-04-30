import { Event } from "./event-model";
import { Request, Response } from "express";
import mongoose from "mongoose";

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
      req.body.eventTime &&
      req.body.stripeProductId
    ) {
      const event = new Event({
        eventTitle: req.body.eventTitle,
        eventDescription: req.body.eventDescription,
        eventLocation: req.body.eventLocation,
        eventTime: new Date(req.body.eventTime),
        stripeProductId: req.body.stripeProductId
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
          stripeProductId:
            req.body.stripeProductId != "" ? req.body.stripeProductId : eventData.stripeProductId,
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
