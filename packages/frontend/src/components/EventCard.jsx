import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import "./EventCardStyles.css";
import orangeClub from "../assets/orangeClub.jpg";

/*
Here for EventCard, we pass the title and details as props so that we can put values dynamically from eventsData.js.
eventsData.js file will work as a data file / work as an api (creates data for each project I want to display). We will render this ProjectCard in the Work.js file.
*/

const EventCard = (props) => {
  const { eventId, title, description, date, location } = props; //destructing props for cleaner code

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src={orangeClub} alt="Event Image" className="event-image" />
      </div>
      <div className="event-details">
        <h1 className="event-title">{title}</h1>
        <p>{description}</p>
        <p>Date: {date}</p>
        <p>Location: {location}</p>
        <div className="event-buttons">
          <Link
            to={`/Register?eventId=${eventId}&title=${title}&date=${date}&description=${description}&location=${location}`}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  eventId: PropTypes.number,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
};

export default EventCard;
