import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import dayjs from "dayjs";

const Events = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [userEvents, setUserEvents] = useState([]);
  const { uid, currentUser } = useContext(AuthContext);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchUsersEvents = async () => {
      try {
        const token = await currentUser.getIdToken();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/userEvents/${uid}`,
          { headers }
        );
        const data = response.data;
        console.log("all data:", data);
        setUserEvents(data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };
    fetchUsersEvents();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const upcomingEvents = userEvents.filter(
      (event) => new Date(event.eventTime) > currentDate
    );
    setFilteredEvents(upcomingEvents);
    console.log(filteredEvents);
  }, [userEvents]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    const currentDate = new Date();

    if (tab === "upcoming") {
      const upcomingEvents = userEvents.filter(
        (event) => new Date(event.eventTime) > currentDate
      );
      setFilteredEvents(upcomingEvents);
    } else if (tab === "past") {
      const pastEvents = userEvents.filter(
        (event) => new Date(event.eventTime) < currentDate
      );
      setFilteredEvents(pastEvents);
    }
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
      </div>

      {/* Right Content */}
      <div className="w-3/4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">My Events</h2>
          <div className="flex space-x-4">
            <button
              className={`${
                selectedTab === "upcoming"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              } py-2 px-4 rounded text-lg`}
              onClick={() => handleTabChange("upcoming")}
            >
              Upcoming Events
            </button>
            <button
              className={`${
                selectedTab === "past"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              } py-2 px-4 rounded text-lg`}
              onClick={() => handleTabChange("past")}
            >
              Past Events
            </button>
          </div>
        </div>
        {selectedTab === "upcoming" ? (
          <div>
            <p className="text-3xl font-bold mb-4">Upcoming Events</p>
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded p-4 mb-2">
                <h3 className="text-black text-lg font-bold">
                  {event.eventTitle}
                </h3>
                <p className="text-black">
                  Date: {dayjs(event.eventTime).format("MMM D, YYYY h:mm A")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-3xl font-bold mb-4">Past Events</p>
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded p-4 mb-2">
                <h3 className="text-black text-lg font-bold">
                  {event.eventTitle}
                </h3>
                <p className="text-black">
                  This event was held at: {event.eventLocation}
                </p>
                <p className="text-black">
                  Date: {dayjs(event.eventTime).format("MMM D, YYYY h:mm A")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
