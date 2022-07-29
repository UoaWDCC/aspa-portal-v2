import Event from "../models/event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    console.log(eventData);
    const event = new Event({
      eventTitle: eventData.eventTitle,
      eventDescription: eventData.eventDescription,
      eventLocation: eventData.eventLocation,
      eventDate: new Date(),
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.json(error);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findByIdAndUpdate(
      { _id: eventId },
      {
        eventTitle: "ok updated",
      }
    );

    res.json(event);
  } catch (error) {
    res.json(error);
  }
};
