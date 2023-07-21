import React from "react";
import eventsData from "./eventsData";

export default function AdminEvents() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white ml-44 mt-12 mb-8">Events</h1>
      <div className="grid grid-cols-2 w-9/12 mx-auto gap-8">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="bg-gray-900 p-4 rounded-md shadow-lg shadow-gray-600 mb-4"
          >
            <h2 className="text-2xl font-semibold text-white">{event.name}</h2>
            <p className="text-white mt-2">Description: {event.description}</p>
            <p className="text-white">Location: {event.location}</p>
            <p className="text-white">Price: ${event.price}</p>
            <p className="text-white">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className={`text-${event.completed ? "green" : "red"}-500`}>
              {event.completed ? "Completed" : "Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
