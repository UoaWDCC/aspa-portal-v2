import axios from "axios";
import { useEffect, useState } from "react";
import "./assets/fonts.css";

export default function EventBoxLeft(objectId) {
  const [eventData, setEventData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventLink, setEventLink] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/event/${objectId.objectId}`)
      .then((response) => setEventData(response.data))
      .catch((error) => console.log(error));
    console.log(eventData);
  }, [eventData]);

  const sendData = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:5000/event/${objectId.objectId}`, {
      eventTitle,
      eventDescription,
      eventLocation,
      eventLink,
    });
    console.log("AAAAAAAAAAAAAAAA");
    console.log(objectId.objectId);
    toggleEdit();
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="w-4/5 h-1/2 text-white rounded-sm flex-wrap bg-black bg-opacity-60 overflow-hidden last:mb-10">
      <div className="relative border-solid border-2 border-white md:basis-2/3  flex-col">
        {!edit ? (
          <>
            <button
              className="absolute top-1 right-3 z-50 text-5xl"
              onClick={toggleEdit}
            >
              &#8801;
            </button>
            <div className="text-center text-6xl text-white basis-1/4 p-4 playfair">
              <h2>{eventData?.eventTitle}</h2>
            </div>
            <div className="text-center text-base text-white basis-1/4 p-4 unna">
              <h3>{eventData?.eventDescription}</h3>
            </div>
            <div className="text-center basis-1/4 text-neutral-300 p-4 unna">
              <h4>{eventData?.eventLocation}</h4>
              <h4>THURSDAY . 19/05 6:30PM - 8:30PM</h4>
            </div>
            <div className="flex justify-center align-center px-4 pt-4 pb-8 basis-1/4">
              <button
                className="text-base border-solid border-2 border-white w-4/5 h-12 playfair z-50"
                onClick={() => window.open(eventData?.eventLink, "_blank")}
              >
                Register
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="absolute top-1 right-3 z-50 text-5xl"
              onClick={toggleEdit}
            >
              &#10003;
            </button>
            <form>
              <div className="m-5">
                <label className="text-3xl align-top">Title:&#160;</label>
                <textarea
                  className="text-xl z-50 bg-neutral-800 justify-center unna w-full"
                  name="title"
                  onChange={(event) => setEventTitle(event.target.value)}
                >
                  {eventData?.eventTitle}
                </textarea>
              </div>
              <div className="m-5">
                <label className="text-3xl align-top">Description:&#160;</label>
                <textarea
                  className="text-xl z-50 bg-neutral-800 justify-center unna w-full"
                  name="description"
                  onChange={(event) => setEventDescription(event.target.value)}
                >
                  {eventData?.eventDescription}
                </textarea>
              </div>
              <div className="m-5">
                <label className="text-3xl align-top">Location:&#160;</label>
                <textarea
                  className="text-xl z-50 bg-neutral-800 justify-center unna w-full"
                  name="location"
                  onChange={(event) => setEventLocation(event.target.value)}
                >
                  {eventData?.eventLocation}
                </textarea>
              </div>
              <div className="m-5">
                <label className="text-3xl align-top">Time:&#160;</label>
                <input
                  type="date"
                  className="bg-neutral-800 text-xl w-full"
                  name="time"
                />
              </div>
              <div className="m-5">
                <label className="text-3xl align-top">
                  Register Link:&#160;
                </label>
                <textarea
                  className="text-xl z-50 bg-neutral-800 justify-center unna w-full"
                  name="link"
                  onChange={(event) => setEventLink(event.target.value)}
                >
                  {eventData?.eventLink}
                </textarea>
              </div>
              <div className="flex justify-center align-center px-4 pt-4 pb-8 basis-1/4">
                <button
                  type="submit"
                  onClick={sendData}
                  className="text-base border-solid border-2 border-white w-4/5 h-12 playfair z-50"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
