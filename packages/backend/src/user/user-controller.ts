import { User } from "./user-model";
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
 *  Get user by their firebaseId
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
// TODO make it so that only admin users can call this
export const makeUserAdmin = async (req: Request, res: Response) => {
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
