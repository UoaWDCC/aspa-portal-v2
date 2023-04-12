import Event from "../models/event";
import express, { Request, Response } from "express";

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
        const event = await Event.findById(eventId);
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        console.log("AAAAAAAAAAA");
        const event = new Event({
            eventTitle: req.body.eventTitle,
            eventDescription: req.body.eventDescription,
            eventLocation: req.body.eventLocation,
            eventDate: new Date(),
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.json(error);
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        console.log("PATCH REQUEST");
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
                            : eventData.eventTitle,
                    eventDate: new Date(),
                    eventLink:
                        req.body.eventLink != ""
                            ? req.body.eventLink
                            : eventData.eventLink,
                }
            );

            res.json(event);
        }
    } catch (error) {
        res.json(error);
    }
};
