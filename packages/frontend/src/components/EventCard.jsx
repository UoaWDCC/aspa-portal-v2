import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import "./EventCardStyles.css";
import orangeClub from "../assets/mainBG.jpg";
import dayjs from "dayjs";

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
        <p>Date: {dayjs(date).format("MMM D, YYYY h:mm A")}</p>
        <p>Location: {location}</p>
        <div className="event-buttons">
          <Link to={`/event-register?eventId=${eventId}`}>Register</Link>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  eventId: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
};

export default EventCard;
