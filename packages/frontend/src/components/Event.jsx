import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import "./EventStyles.css";
import { TailSpin } from "react-loader-spinner";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllEvents() {
      const response = await axios.get("http://localhost:5000/events");
      const data = response.data;
      setEvents(data);
      setLoading(false);
      console.log(data);
    }
    fetchAllEvents();
  }, []);
  return (
    <>
      {loading ? (
        <div className="spinner">
          <TailSpin color="#ffffff" height={100} width={100} timeout={5000} />
        </div>
      ) : (
        <div className="events-container">
          <section className="upcoming-event">
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
          </section>
        </div>
      )}
    </>
  );
};

export default Event;
