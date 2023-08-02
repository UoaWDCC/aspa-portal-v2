import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  // fetch events from backend
  useEffect(() => {
    async function fetchAllEvents() {
      const response = await axios.get("http://localhost:5000/events");
      const data = response.data;
      setEvents(data);
    }
    fetchAllEvents();
  }, [events]);

  // delete event
  const handleDeleteEvent = async (eventId) => {
    console.log(`Deleting event with ID: ${eventId}`);

    const response = await fetch(`http://localhost:5000/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white ml-44 mt-12 mb-8">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 w-9/12 mx-auto gap-8 relative">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-gray-800 p-6 rounded-md shadow-md border border-gray-700 mb-4 relative "
          >
            <h2 className="text-2xl font-semibold text-white">
              {event.eventTitle}
            </h2>
            <p className="text-gray-300 mt-2">
              Description: {event.eventDescription}
            </p>
            <p className="text-gray-300">Location: {event.eventLocation}</p>
            <p className="text-gray-300">Price: $7</p>
            <p className="text-gray-300">
              Date: {new Date(event.eventTime).toLocaleDateString()}
            </p>
            <p className="text-gray-300">
              {event.completed ? "Status: Completed" : "Status: Ongoing"}
            </p>
            <FaTrash
              size={20}
              className="absolute top-4 right-4 text-white cursor-pointer hover:opacity-75"
              onClick={() => handleDeleteEvent(event._id)}
            />

            {/* link to individual event page */}
            <a href={`events/${event._id}`}>
              <FaArrowRight
                size={22}
                className="absolute bottom-4  right-4 cursor-pointer hover:opacity-75"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
