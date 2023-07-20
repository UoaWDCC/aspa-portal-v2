import { Event, RegistrationRecordEvent } from "../event/event-model";
import { Request, Response } from "express";
import { User, RegistrationRecordUser } from "../user/user-model";

/**
 * Register user to an event and event to a user
 */
export const registerUserEvent = async (req: Request, res: Response) => {
    try {
        const {
            eventId,
            email,
            registrationDate,
            paymentStatus,
            paymentDetails,
        } = req.body;

        // Check if user is guest
        if (req.userFbId === "guest") {
            // check if the event is already registerd to the user
            const event = await Event.findById(eventId);

            const userAlreadyPresent = event?.users?.find(
                (e: RegistrationRecordEvent) =>
                    e.email?.toString() === email.toString()
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
                            registrationDate: registrationDate,
                            paymentStatus: paymentStatus,
                            paymentDetails: paymentDetails,
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
                        registrationDate: registrationDate,
                        paid: paymentStatus,
                        paymentDetails: paymentDetails,
                    },
                },
            },
            { new: true }
        );

        res.status(200).json({ message: "User registered to event" });
    } catch (error) {
        console.error(error);
        res.status(400).json((error as Error).message);
    }
};

// TODO Fix the remove registration to account for guest stuff
export const removeRegistration = async (req: Request, res: Response) => {
    try {
        const { userId, eventId } = req.params;

        // Check if user is registered under the event
        const eventData = await Event.findOne({
            _id: eventId,
            users: { $elemMatch: { userId: userId } },
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
                            userId: userId,
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

// TODO Fix the updatePaymentStatus to account for guest stuff
export const updatePaymentStatus = async (req: Request, res: Response) => {
    try {
        const { userId, eventId } = req.params;
        const { paid } = req.body;

        if (typeof paid != "boolean") {
            throw new Error("Paid status is not a boolean");
        }

        if (paid === undefined || paid === null) {
            throw new Error("Paid status was not provided");
        }

        // Check if user is registered under the event
        const eventData = await Event.findOne({
            _id: eventId,
            users: { $elemMatch: { userId: userId } },
        });

        // If registration already exists, update paid status, otherwise return error
        if (eventData != null) {
            await Event.updateOne(
                {
                    _id: eventId,
                    "users.userId": userId,
                },
                {
                    $set: { "users.$.paid": paid },
                }
            );

            await User.updateOne(
                {
                    _id: userId,
                    "events.eventId": eventId,
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
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};
