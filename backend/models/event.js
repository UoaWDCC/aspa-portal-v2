import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  eventTitle: String,
  eventDescription: String,
  eventLocation: String,
  eventTime: Date,
  eventLink: String,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
