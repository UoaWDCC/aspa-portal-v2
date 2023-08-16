import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [matchedEvent, setMatchedEvent] = useState({});
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAllEvents() {
      const token = await currentUser.getIdToken();

      const response = await axios.get("http://localhost:5000/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setEvents(data);
    }
    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const event = events.find((event) => event._id === eventId);
      if (event) {
        setMatchedEvent(event);
      }
    }
  }, [events, eventId]);

  const returnToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="ml-36 mt-24">
      <div className="text-5xl">
        {matchedEvent && <p>{matchedEvent.eventTitle}</p>}
      </div>
      <p className="text-3xl mt-4">Location: {matchedEvent.eventLocation}</p>
      <p className="text-xl mt-2">
        Time: {new Date(matchedEvent.eventTime).toLocaleString()}
      </p>
      <p className="text-lg mt-2">
        Description: {matchedEvent.eventDescription}
      </p>

      <h2 className="mt-14 text-4xl fw-bold">Registered Users</h2>

      <div className="mr-12">
        <table className="mt-8 mb-10 w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 text-lg font-semibold border-b border-gray-500">
                Name
              </th>
              <th className="py-3 px-4 text-lg font-semibold border-b border-gray-500">
                Email
              </th>
              <th className="py-3 px-4 text-lg font-semibold border-b border-gray-500">
                Paid
              </th>
            </tr>
          </thead>
          <tbody>
            {matchedEvent.users &&
              matchedEvent.users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">
                    {user.firstName || user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : "Unknown"}
                  </td>
                  <td className="border px-4 py-2">
                    {user.email ? `${user.email}` : "Unknown"}
                  </td>
                  <td className="border px-4 py-2">
                    {user.isPaid ? `${user.isPaid}` : "x"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <FaArrowLeft
        size={30}
        className="absolute top-8 left-30 cursor-pointer"
        onClick={returnToPreviousPage}
      />
    </div>
  );
};

export default EventDetails;
