import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  eventTitle: String, // String is shorthand for {type: String}
  eventDescription: String,
  eventLocation: String,
  eventTime: Date,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
