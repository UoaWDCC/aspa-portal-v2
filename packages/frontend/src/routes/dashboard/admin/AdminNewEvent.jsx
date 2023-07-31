import React, { useRef } from "react";
import { motion } from "framer-motion";

const AdminNewEvent = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      nameRef.current.value,
      descriptionRef.current.value,
      locationRef.current.value,
      priceRef.current.value,
      dateRef.current.value
    );
  };

  // const onEventFormSubmit = async (e) => {
  //   e.preventDefault;

  //   const newEvent = {
  //     name: nameRef.current.value,
  //     description: descriptionRef.current.value,
  //     location: locationRef.current.value,
  //     price: priceRef.current.value,
  //     date: dateRef.current.value,
  //   };
  // };

  return (
    <div className="flex justify-center items-center h-screen ">
      <motion.form
        className="bg-gray-900 p-20 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
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
            id="price"
            name="price"
            ref={priceRef}
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
