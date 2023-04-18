import { Event, RegistrationRecordEvent } from "../models/event";
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
            req.body.eventTime
        ) {
            const event = new Event({
                eventTitle: req.body.eventTitle,
                eventDescription: req.body.eventDescription,
                eventLocation: req.body.eventLocation,
                eventTime: new Date(req.body.eventTime),
            });
            await event.save();
            res.status(201).json(event);
        } else {
            return res
                .status(400)
                .json({ error: "Please fill in all the fields" });
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
                        req.body.eventTime != ""
                            ? req.body.eventTime
                            : eventData.eventTime,
                    eventLink:
                        req.body.eventLink != ""
                            ? req.body.eventLink
                            : eventData.eventLink,
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

/**
 *  Register a user to an event
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        const { userId, registrationDate, paymentStatus, paymentDetails } =
            req.body;

        const user = {
            userId,
            registrationDate,
            paymentStatus,
            paymentDetails,
        };

        const event = await Event.findById(eventId);

        const userAlreadyPresent = event?.users?.find(
            (e: RegistrationRecordEvent) =>
                e.userId.toHexString() === userId.toString()
        );
        if (userAlreadyPresent) {
            const err: Error = new Error();
            err.message = "User already registered for this event";
            throw err;
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $addToSet: { users: user } },
            { new: true }
        );

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

// Remove a user from an event's list of registered users
export const removeUser = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $pull: { users: { userId: userId } } },
            { new: true }
        );

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
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
