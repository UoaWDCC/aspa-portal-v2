import React, { useEffect, useState } from "react";
import BG from "../../../assets/mainBG.jpg";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const { currentUser } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAllEvents() {
      const response = await axios.get("http://localhost:5000/events");
      const data = response.data;
      // Parse event dates into Date objects
      data.forEach((event) => {
        event.eventTime = new Date(event.eventTime);
      });

      // Sort events by date
      data.sort((a, b) => a.eventTime - b.eventTime);

      // Filter out past events
      const currentDateTime = new Date();
      const filteredEvents = data.filter(
        (event) => event.eventTime.getTime() > currentDateTime.getTime()
      );
      setEvents(filteredEvents);
    }
    fetchAllEvents();
  }, []);

  return (
    <div className="ml-36 mt-16 text-white z-10">
      <div>
        <h2 className="text-4xl font-bold">Hi. {currentUser?.email}</h2>
        <div>
          <h3 className="mt-16 mb-4 text-2xl font-semibold">
            Upcoming Scheduled Events
          </h3>
          <div className="w-24 border-b-4 mb-12"></div>

          <div className="flex flex-wrap gap-10">
            {events.map((event, i) => (
              <Link to={`events/${event._id}`} className="flex gap-8" key={i}>
                <div
                  className="h-56 w-96 rounded-md grid place-items-center cursor-pointer ease-in-out duration-300 hover:scale-105"
                  style={{
                    backgroundImage: `url(${BG})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <p className="text-lg font-bold ">{event.eventTitle}</p>
                  <p>Time: {event.eventTime.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
