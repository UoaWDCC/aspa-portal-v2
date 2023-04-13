import User from "../models/user";
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
 * Required fields: name, email, university, skillLevel. 
 * Optional fields: studentId
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, university, studentId, skillLevel } = req.body;

        if (name && email && university && skillLevel) {
            const newUser = await User.create({
                name: name,
                email: email,
                university: university,
                skillLevel: skillLevel,
                eventsAttended: 0,
            });

            if (studentId) newUser.studentId = studentId;

            res.status(201).json(newUser);
        } else {
            res.status(400).json({ message: "Missing required fields: " + (name ? "" : `name=${name} `) + (email ? "" : `email=${email} `) + (university ? "" : `university=${university} `) + (skillLevel ? "" : `skillLevel=${skillLevel} `) });
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
        const { name, email, university, studentId, skillLevel, eventsAttended } =
            req.body;

        interface UpdateObject {
            name?: string;
            email?: string;
            university?: string;
            studentId?: number;
            skillLevel?: string;
            eventsAttended?: number;
        }

        const update: UpdateObject = {};
        if (name) update.name = name;
        if (email) update.email = email;
        if (university) update.university = university;
        if (studentId) update.studentId = studentId;
        if (skillLevel) update.skillLevel = skillLevel;
        if (eventsAttended) update.eventsAttended = eventsAttended;

        const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

/**
 * Increment the number of events attended by a user by 1
 */
export const addEvent = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const updatedUser = await User.findByIdAndUpdate(userId, { $inc: { eventsAttended: 1 } }, { new: true })

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

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