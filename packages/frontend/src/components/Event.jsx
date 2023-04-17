import React from "react";
import eventsData from "../routes/UpcomingEvents/eventsData";
import EventCard from "./EventCard";
import "./EventStyles.css";

const Event = () => {
  return (
    <div className="events-container">
      <div className="upcoming-event">
        {eventsData.map((value) => {
          return (
            <EventCard
              key={value.eventId}
              eventId={value.eventId}
              title={value.title}
              date={value.date}
              description={value.description}
              location={value.location}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Event;
