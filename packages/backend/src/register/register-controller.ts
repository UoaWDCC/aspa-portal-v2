import { Event, RegistrationRecordEvent } from "../event/event-model";
import { Request, Response } from "express";
import { User, RegistrationRecordUser } from "../user/user-model";

/**
 * Register user to an event and event to a user
 */
export const registerUserEvent = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, registrationDate, paymentStatus, paymentDetails } =
      req.body;

    // Check if the user is already registered to the event
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

    // check if the event is already registerd to the user
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

    // Add the user to the event
    await Event.findByIdAndUpdate(
      eventId,
      {
        $push: {
          users: {
            userId: userId,
            registrationDate: registrationDate,
            paymentStatus: paymentStatus,
            paymentDetails: paymentDetails,
          },
        },
      },
      { new: true }
    );

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
    res.status(200).json({ message: "User registered to event" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const removeRegistration = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.params;

    // Check if user is registered under the event
    const eventData = await Event.findOne({
      _id: eventId,
      users: { $elemMatch: { userId: userId } },
    });

    // If registration already exists, delete registration, otherwise return error
    if (eventData != null) {
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
    } else {
      const err: Error = new Error();
      err.message = "Unable to delete registration, it does not exist";
      throw err;
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.params;
    let { paymentStatus } = req.body;

    if (!paymentStatus) {
      const err: Error = new Error();
      err.message = "Payment status was not provided";
      throw err;
    }

    // Check if user is registered under the event
    const eventData = await Event.findOne({
      _id: eventId,
      users: { $elemMatch: { userId: userId } },
    });

    // If registration already exists, update payment status, otherwise return error
    if (eventData != null) {
      await Event.updateOne(
        {
          _id: eventId,
          "users.userId": userId,
        },
        {
          $set: { "users.$.paymentStatus": paymentStatus },
        }
      );

      await User.updateOne(
        {
          _id: userId,
          "events.eventId": eventId,
        },
        {
          $set: { "events.$.paymentStatus": paymentStatus },
        }
      );
      res.status(200).json({ message: "Payment status has been updated" });
    } else {
      const err: Error = new Error();
      err.message = "Unable to update registration, it does not exist";
      throw err;
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
