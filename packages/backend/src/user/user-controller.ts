import { User } from "./user-model";
import { Request, Response } from "express";
import { Event } from "../event/event-model";

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
 * Get a specific user's UID by their firebase id
 */
export const getUserId = async (req: Request, res: Response) => {
  try {
    const firebaseId = req.userFbId;
    console.log("Firebase ID received from the request:", firebaseId); // Log the received firebaseId
    const user = await User.findOne({ firebaseId: firebaseId });
    if (user) {
      const uid = user._id;
      console.log("User found:", user);
      res.status(200).json(uid);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("new error", error);
    res.status(500).json({ error: "Internal server error" });
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
 *  Get user OBJECT by their firebaseId
 */
export const getUserByFirebaseId = async (req: Request, res: Response) => {
  try {
    const { firebaseId } = req.params;
    const user = await User.findOne({ firebaseId: firebaseId });
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
    const { firstName, lastName, email } = req.body;

    const firebaseId = req.userFbId;
    const role = "user";
    // Check if that user already exists
    if (await User.findOne({ firebaseId: firebaseId })) {
      res.status(400).json({ message: "User already exists" });
    }

    if (firstName && lastName && email) {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        role,
        firebaseId,
      });

      res.status(201).json(newUser);
    } else {
      res.status(400).json({
        message:
          "Missing required fields: " +
          (firstName ? "" : `firstName=${firstName}`) +
          (lastName ? "" : `lastName=${lastName}`) +
          (email ? "" : `email=${email} `),
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

    let {
      firstName,
      lastName,
      email,
      firebaseId,
      university,
      studentId,
      skillLevel,
    } = req.body;

    if (!firstName) firstName = user?.firstName;
    if (!lastName) lastName = user?.lastName;
    if (!email) email = user?.email;
    if (!firebaseId) firebaseId = user?.firebaseId;
    if (!university) university = user?.university;
    if (!studentId) studentId = user?.studentId;
    if (!skillLevel) skillLevel = user?.skillLevel;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        firebaseId,
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

// Make a user admin
export const makeUserAdmin = async (req: Request, res: Response) => {
  if (req.userRole != "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role: "admin",
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
 * Get a users registered events
 */
export const getUserEvents = async (req: Request, res: Response) => {
  try {
    let user;
    if (req.userRole === "admin") {
      const userId = req.params.userId;
      user = await User.findById(userId);
    } else {
      user = await User.findOne({ firebaseId: req.userFbId });
    }

    if (user == null) {
      return res.status(404).json({ error: "User not found" });
    }

    const eventIds = user.events.map((event) => event.eventId);

    const events = await Event.find({ _id: { $in: eventIds } }, { users: 0 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
