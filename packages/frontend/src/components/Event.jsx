import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import "./EventStyles.css";

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAllEvents() {
      const response = await axios.get("http://localhost:5000/events");
      const data = response.data;
      setEvents(data);
      console.log(data);
    }
    fetchAllEvents();
  }, []);
  return (
    <>
      <div className="events-container">
        <div className="upcoming-event">
          {events.map((event) => {
            return (
              <EventCard
                key={event._id}
                eventId={event._id}
                title={event.eventTitle}
                date={event.eventTime}
                description={event.eventDescription}
                location={event.eventLocation}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Event;
