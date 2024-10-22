import { Event, RegistrationRecordEvent } from "../event/event-model";
import { Request, Response } from "express";
import { User, RegistrationRecordUser } from "../user/user-model";
import EmailService from "../email/emailService";

/**
 * Register user to an event and event to a user
 */

interface registerUserEventRequest {
    eventId: string;
    firstName: string;
    lastName: string;
    email: string;
    paymentType: "cash" | "Bank Transfer" | "points";
}

export const registerUserEvent = async (req: Request, res: Response) => {
    try {
        const { eventId, firstName, lastName, email, paymentType } =
            req.body as registerUserEventRequest;

        const event = await Event.findById(eventId);
        if (event == null) {
            throw new Error("Event does not exist");
        }
        // Check if user is guest
        if (req.userFbId === "guest") {
            // check if the event is already registerd to the user

            const userAlreadyPresent = event?.users?.find(
                (e: RegistrationRecordEvent) => e.email === email
            );
            if (userAlreadyPresent) {
                throw new Error("User already registered for this event");
            }
        } else {
            // If it is a registered user check if they are already registered and then register the event to the user
            const user = await User.findOne({ firebaseId: req.userFbId });
            const userId = user?._id;

            // Check if the user is already registered to the event
            //const user = await User.findById(userId);

            const eventAlreadyPresent = user?.events?.find(
                (e: RegistrationRecordUser) =>
                    e.eventId.toHexString() === eventId.toString()
            );
            if (eventAlreadyPresent) {
                throw new Error(
                    "Event already present in user's list of events"
                );
            }

            // check if the event is already registerd to the user
            const event = await Event.findById(eventId);

            const userAlreadyPresent = event?.users?.find(
                (e: RegistrationRecordEvent) =>
                    e.userId.toString() === userId?.toString()
            );
            if (userAlreadyPresent) {
                throw new Error("User already registered for this event");
            }

            // Add the event to the user
            await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        events: {
                            eventId: eventId,
                            paymentType,
                            isPaid: req.body.isPaid || false,
                        },
                    },
                },
                { new: true }
            );
        }
        // Add the user to the event (if it is a guest it is only added to the event)
        await Event.findByIdAndUpdate(
            eventId,
            {
                $push: {
                    users: {
                        userId: req.userFbId,
                        email: email,
                        firstName,
                        lastName,
                        paymentType,
                        isPaid: req.body.isPaid || false,
                    },
                },
            },
            { new: true }
        );
        // TODO: modify this to send email when using points
        if (paymentType == "cash" || paymentType == "points") {
            await EmailService.sendEventEmail(
                email,
                firstName,
                event.eventTitle,
                event.eventTime.toLocaleString("en-GB", { timeZone: "nz" }),
                event.eventLocation,
                paymentType
            );
        }
        res.status(200).send("User registered for event");
    } catch (error) {
        console.error(error);
        res.status(400).json((error as Error).message);
    }
};

// TODO Fix the remove registration to account for guest stuff
export const removeRegistration = async (req: Request, res: Response) => {
    try {
        if (req.userRole !== "admin") {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { userFbId, eventId } = req.params;

        const user = await User.findOne({ firebaseId: userFbId });
        const userId = user?._id;

        // Check if user is registered under the event
        const eventData = await Event.findOne({
            _id: eventId,
            users: { $elemMatch: { userId: userFbId } },
        });

        if (eventData == null) {
            throw new Error("Unable to delete registration, it does not exist");
        } else {
            // Remove the user from the event
            await Event.findByIdAndUpdate(
                eventId,
                {
                    $pull: {
                        users: {
                            userId: userFbId,
                        },
                    },
                },
                { new: true }
            );

            // Remove the event from the user
            await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        events: {
                            eventId: eventId,
                        },
                    },
                },
                { new: true }
            );
            res.status(200).json({ message: "User removed from event" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

// TODO Fix the updateIsPaid to account for guest stuff
export const updateIsPaid = async (req: Request, res: Response) => {
    try {
        if (req.userRole !== "admin") {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { userFbId, eventId } = req.params;
        const { isPaid } = req.body;

        const user = await User.findOne({ firebaseId: userFbId });
        const userId = user?._id;

        if (typeof isPaid != "boolean") {
            throw new Error("isPaid is not a boolean");
        }

        if (isPaid === undefined || isPaid === null) {
            throw new Error("isPaid was not provided");
        }

        // Check if user is registered under the event
        const eventData = await Event.findOne({
            _id: eventId,
            users: { $elemMatch: { userId: userFbId } },
        });

        // If registration already exists, update isPaid, otherwise return error
        if (eventData != null) {
            await Event.updateOne(
                {
                    _id: eventId,
                    "users.userId": userFbId,
                },
                {
                    $set: { "users.$.isPaid": isPaid },
                }
            );

            await User.updateOne(
                {
                    _id: userId,
                    "events.eventId": eventId,
                },
                {
                    $set: { "events.$.isPaid": isPaid },
                }
            );
            res.status(200).json({
                message: "isPaid has been updated",
            });
        } else {
            throw new Error("Unable to update registration, it does not exist");
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};
