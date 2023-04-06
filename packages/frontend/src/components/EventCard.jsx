import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

/*
Here for EventCard, we pass the title and details as props so that we can put values dynamically from eventsData.js.
eventsData.js file will work as a data file / work as an api (creates data for each project I want to display). We will render this ProjectCard in the Work.js file.
*/
const EventCard = (props) => {
  return (
    <div className="event-card">
      <h2 className="event-title">{props.title}</h2>
      <div className="event-details">
        <p>{props.description}</p>
        <p>Date : {props.date}</p>
        <p>Location : {props.location}</p>
        <div className="event-buttons">
          <Link to="/Register">Registration</Link>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
};

export default EventCard;
