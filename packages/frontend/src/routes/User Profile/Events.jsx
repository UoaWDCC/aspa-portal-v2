import React, { useState } from "react";

const Events = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  // Placeholder data for events
  const upcomingEvents = [
    { id: 1, name: "Upcoming Event 1", date: "2023-08-15" },
    { id: 2, name: "Upcoming Event 2", date: "2023-09-20" },
  ];

  const pastEvents = [
    { id: 3, name: "Past Event 1", date: "2023-07-10" },
    { id: 4, name: "Past Event 2", date: "2023-07-25" },
  ];

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="container mx-auto py-8 flex">
      {/* Left Navigation Pane */}
      <div className="w-1/4 pr-8">
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4 text-black">My Tickets</h2>
          <ul className="space-y-2">
            <li
              className="cursor-pointer text-black"
              onClick={() => handleTabChange("upcoming")}
            >
              Upcoming Events
            </li>
            <li
              className="cursor-pointer text-black"
              onClick={() => handleTabChange("past")}
            >
              Past Events
            </li>
          </ul>
        </div>
        <div className="mt-4 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4 text-black">My Profile</h2>
          {/* Add more items in the user's profile */}
        </div>
        <div className="mt-4 bg-gray-100 rounded-lg p-4 text-black">
          <h2 className="text-lg font-bold mb-4">My Settings</h2>
          {/* Add settings options here */}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-3/4">
        {selectedTab === "upcoming" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white text-black rounded p-4 mb-2"
              >
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p>Date: {event.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 ">Past Events</h2>
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white text-black rounded p-4 mb-2"
              >
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p>Date: {event.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
