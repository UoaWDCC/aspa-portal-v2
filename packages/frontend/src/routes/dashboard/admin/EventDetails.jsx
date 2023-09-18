import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [matchedEvent, setMatchedEvent] = useState({});
  const [editingEvent, setEditingEvent] = useState(false);
  const { eventId } = useParams();
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  useEffect(() => {
    async function fetchAllEvents() {
      if (!currentUser) {
        // Handle the case when currentUser is not available yet
        return;
      }

      const token = await currentUser.getIdToken();

      try {
        const response = await axios.get("http://localhost:5000/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchAllEvents();
  }, [currentUser]);

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

  const handleEditingEvent = () => {
    setEditingEvent(true);
  };

  const submitEventUpdate = async (e) => {
    e.preventDefault();

    // const date = new Date(dateRef.current.value);

    // const newEvent = {
    //   eventTitle: nameRef.current.value,
    //   eventDescription: descriptionRef.current.value,
    //   eventLocation: locationRef.current.value,
    //   eventTime: date.toISOString(),
    // };

    const token = await currentUser.getIdToken();

    const putResponse = await axios.put(
      `http://localhost:5000/events/${eventId}`,
      {
        eventTitle: "50 cent cheapest event test patching frontend",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const putJson = await putResponse.json();

    if (!putResponse.ok) {
      console.log(putJson.error);
    } else {
      setEditingEvent(false);
    }
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
      <div className="flex gap-20">
        <p className="text-lg mt-2">
          Description: {matchedEvent.eventDescription}
        </p>
        <button
          className="border-white bg-white rounded-sm text-gray-800 border-2 px-4 py-1.5"
          onClick={handleEditingEvent}
        >
          Edit
        </button>
      </div>

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

      {editingEvent ? (
        <form className="bg-gray-500 inline px-10 py-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <h2 className="text-white text-3xl font-bold text-center mb-6 -mt-4">
            Edit Event
          </h2>
          <div className="mb-4">
            <label htmlFor="name" className="text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              defaultValue={matchedEvent.eventTitle}
              className="w-full py-2 px-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-white">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              ref={descriptionRef}
              defaultValue={matchedEvent.eventDescription}
              className="w-full py-2 px-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="text-white">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              ref={locationRef}
              defaultValue={matchedEvent.eventLocation}
              className="w-full py-2 px-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="text-white">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              ref={priceRef}
              defaultValue={7}
              className="w-full py-2 px-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="text-white">
              Date Time:
            </label>
            <input
              type="datetime-local"
              id="datetime-local"
              name="datetime-local"
              ref={dateRef}
              className="w-full py-2 px-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="price" className="text-white">
              Poster:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              ref={fileRef}
              className="w-full py-2 px-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            onClick={submitEventUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      ) : (
        <></>
      )}

      <FaArrowLeft
        size={30}
        className="absolute top-8 left-30 cursor-pointer"
        onClick={returnToPreviousPage}
      />
    </div>
  );
};

export default EventDetails;
