import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";

const AdminNewEvent = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);
  const fileRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  const onEventFormSubmit = async (e) => {
    e.preventDefault();

    const date = new Date(dateRef.current.value);

    const newEvent = {
      eventTitle: nameRef.current.value,
      eventDescription: descriptionRef.current.value,
      eventLocation: locationRef.current.value,
      eventPrice: priceRef.current.value,
      eventTime: date.toISOString(),
    };

    const token = await currentUser.getIdToken();

    const postResponse = await fetch("http://localhost:5000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const postJson = await postResponse.json();

    if (!postResponse.ok) {
      console.log(postJson.error);
    } else {
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      locationRef.current.value = "";
      priceRef.current.value = "";
      dateRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <motion.form
        className="bg-gray-900 p-20 rounded-xl shadow-lg"
        onSubmit={onEventFormSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
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
        <div className="mb-4">
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
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default AdminNewEvent;
