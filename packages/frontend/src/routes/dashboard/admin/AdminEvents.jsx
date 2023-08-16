import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../../AuthContext";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // fetch events from backend
  useEffect(() => {
    async function fetchAllEvents() {
      const response = await axios.get("http://localhost:5000/events");
      const data = response.data;
      setEvents(data);
      setFilteredEvents(data);
    }
    fetchAllEvents();
  }, []);

  // delete event
  const handleDeleteEvent = async (eventId) => {
    console.log(`Deleting event with ID: ${eventId}`);

    const token = await currentUser.getIdToken();

    const response = await fetch(`http://localhost:5000/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
  };

  const filterEvents = (filterType) => {
    setSelectedFilter(filterType);

    if (filterType === "all") {
      setFilteredEvents(events);
    } else if (filterType === "upcoming") {
      const currentDate = new Date();
      const upcomingEvents = events.filter(
        (event) => new Date(event.eventTime) > currentDate
      );
      setFilteredEvents(upcomingEvents);
    } else if (filterType === "past") {
      const currentDate = new Date();
      const pastEvents = events.filter(
        (event) => new Date(event.eventTime) < currentDate
      );
      setFilteredEvents(pastEvents);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white ml-44 mt-12 mb-8">Events</h1>
      <div className="text-center mb-8">
        <button
          className={`mr-4 ${selectedFilter === "all" ? "text-blue-500" : ""}`}
          onClick={() => filterEvents("all")}
        >
          All Events
        </button>
        <button
          className={`mr-4 ${
            selectedFilter === "upcoming" ? "text-blue-500" : ""
          }`}
          onClick={() => filterEvents("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={`mr-4 ${selectedFilter === "past" ? "text-blue-500" : ""}`}
          onClick={() => filterEvents("past")}
        >
          Past Events
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-9/12 mx-auto gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-gray-800 p-6 rounded-md shadow-md border border-gray-700 mb-4 relative"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-white">
                {event.eventTitle}
              </h2>
              <FaTrash
                size={18}
                className="text-white cursor-pointer hover:text-red-500 transition"
                onClick={() => handleDeleteEvent(event._id)}
              />
            </div>
            <p className="text-gray-400">
              Date: {new Date(event.eventTime).toLocaleDateString()}
            </p>
            <p className="text-gray-400">Price: $7</p>
            <a href={`events/${event._id}`}>
              <FaArrowRight
                size={18}
                className="text-white cursor-pointer hover:text-blue-500 transition mt-6"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
