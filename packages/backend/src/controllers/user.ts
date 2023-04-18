import { User, RegistrationRecordUser } from "../models/user";
import { Request, Response } from "express";

/**
 * Get all users in the database
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const events = await User.find({});
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(404).json(error);
    }
};

/**
 * Get a specific user by their id
 */
export const getUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(404).json(error);
    }
};

/**
 * Create a user.
 * Required fields: firstName, lastName, email, university, skillLevel.
 * Optional fields: studentId
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            university,
            studentId,
            skillLevel,
        } = req.body;

        if (firstName && lastName && email && university && skillLevel) {
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                university,
                studentId,
                skillLevel,
            });

            if (studentId) newUser.studentId = studentId;

            res.status(201).json(newUser);
        } else {
            res.status(400).json({
                message:
                    "Missing required fields: " +
                    (firstName ? "" : `firstName=${firstName}`) +
                    (lastName ? "" : `lastName=${lastName}`) +
                    (email ? "" : `email=${email} `) +
                    (university ? "" : `university=${university} `) +
                    (skillLevel ? "" : `skillLevel=${skillLevel} `),
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

/**
 * Update a user
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        let { firstName, lastName, email, university, studentId, skillLevel } =
            req.body;

        if (!firstName) firstName = user?.firstName;
        if (!lastName) lastName = user?.lastName;
        if (!email) email = user?.email;
        if (!university) university = user?.university;
        if (!studentId) studentId = user?.studentId;
        if (!skillLevel) skillLevel = user?.skillLevel;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                email,
                university,
                studentId,
                skillLevel,
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

/**
 * Add an event to a user's list of events
 */
export const addEvent = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const { eventId, registrationDate, paymentStatus, paymentDetails } =
            req.body;

        const event = {
            eventId,
            registrationDate,
            paymentStatus,
            paymentDetails,
        };

        const user = await User.findById(userId);

        const eventAlreadyPresent = user?.events?.find(
            (e: RegistrationRecordUser) =>
                e.eventId.toHexString() === eventId.toString()
        );
        if (eventAlreadyPresent) {
            const err: Error = new Error();
            err.message = "Event already present in user's list of events";
            throw err;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { events: event } },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

/**
 * Remove an event from a user's list of events
 */
export const removeEvent = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const { eventId } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { events: { eventId: eventId } } },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

/**
 * Delete a user from the database
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};
