import React from "react";
import eventsData from "../routes/UpcomingEvents/eventsData";
import EventCard, { EventData } from "./EventCard";
import "./Event.css";

const Event = () => {
  return (
    <div className="events-container">
      <div className="upcoming-event">
        {eventsData.map((value: EventData, index: number) => {
          return (
            <EventCard
              key={index}
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
