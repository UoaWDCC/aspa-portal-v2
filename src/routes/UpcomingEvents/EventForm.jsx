import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [eventTitle, setEventTitle] = useState("A");
  const [eventDescription, setEventDescription] = useState("B");
  const [eventLocation, setEventLocation] = useState("C");

  const sendData = () => {
    axios.post("http://localhost:5000/event", {
      eventTitle,
      eventDescription,
      eventLocation,
    });
    console.log("AAAAAAAAAAAAAAAA");
  };

  return (
    <form>
      <label>
        Event Title:
        <input type="text" name="eventTitle" />
      </label>
      <label>
        Event Description:
        <input type="text" name="eventDescription" />
      </label>
      <label>
        Event Location:
        <input type="text" name="eventLocation" />
      </label>
      <button type="submit" value="Submit" onClick={sendData}>
        Submit
      </button>
    </form>
  );
};

export default EventForm;
