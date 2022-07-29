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
    // const eventData = req.body;
    const event = new Event({
      eventTitle: "Event 1",
      eventDescription: "Event 1 desc",
      eventLocation: "OGGB",
      eventDate: new Date(),
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.json(error);
  }
};
