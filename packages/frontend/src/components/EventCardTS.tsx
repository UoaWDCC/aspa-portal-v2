import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

/*
Here for EventCard, we pass the title and details as props so that we can put values dynamically from eventsData.js.
eventsData.js file will work as a data file / work as an api (creates data for each project I want to display). We will render this ProjectCard in the Work.js file.
*/

// Defining specific types for event data. Currently title, desc, date, location is the only props I need for EventData to display in EventCard.
export type EventData = {
  title: string;
  description: string;
  date: string;
  location: string;
};

// Use TypeScript interface for prop types
interface EventCardProps extends EventData {
  // additional props can be added here as needed. Here add the props that might be needed more than what is in EventData.
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  location,
}) => {
  return (
    <div className="event-card">
      <h2 className="event-title">{title}</h2>
      <div className="event-details">
        <p>{description}</p>
        <p>Date: {date}</p>
        <p>Location: {location}</p>
        <div className="event-buttons">
          <Link to="/Register">Registration</Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
