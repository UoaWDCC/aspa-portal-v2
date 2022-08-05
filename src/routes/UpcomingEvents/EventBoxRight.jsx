import { useState } from "react";
import aspaLogo from "./images/ASPA_logo_inverted.png";
import "./assets/fonts.css";

export default function EventBoxLeft() {
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="w-4/5 h-1/2 text-white flex flex-col md:flex-row md:flex-row-reverse flex-wrap bg-neutral-900 overflow-hidden last:mb-10">
      <div className="flex justify-center align-center overflow-hidden border-solid border-2 border-white basis-1/3">
        {!edit ? (
          <img
            src={require("./images/testImg.jpg")}
            alt="Image of pool table"
            className="flex-shrink-0 min-w-full min-h-full overflow-hidden"
          />
        ) : (
          <>
            <div className="">
              <label className="m-5 text-3xl">Image: </label>
              <input type="file" className="m-5" />
            </div>
          </>
        )}
      </div>
      <div className="relative border-solid border-2 border-white md:basis-2/3 flex flex-col overflow-hidden">
        {!edit ? (
          <>
            <button
              className="absolute top-1 right-3 z-50 text-5xl"
              onClick={toggleEdit}
            >
              &#8801;
            </button>
            <img src={aspaLogo} alt="" className="absolute bottom-0 right-0" />
            <div className="text-center text-6xl text-white basis-1/4 p-4 playfair">
              <h2>Event A</h2>
            </div>
            <div className="text-center text-base text-white basis-1/4 p-4 unna">
              <h3>
                Bring your cue skills, friends and pool rivals for a casual
                night of pool.
                <br />
                $6.00 with ASPA membership
              </h3>
            </div>
            <div className="text-center basis-1/4 text-neutral-300 p-4 unna">
              <h4>9 CITY ROAD . ORANGE POOL CLUB</h4>
              <h4>THURSDAY . 19/05 6:30PM - 8:30PM</h4>
            </div>
            <div className="flex justify-center align-center px-4 pt-4 pb-8 basis-1/4">
              <button
                className="text-base border-solid border-2 border-white w-4/5 h-12 playfair z-50"
                onClick={() => window.open("https://google.com", "_blank")}
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
                <textarea className="text-xl z-50 bg-neutral-800 justify-center unna w-full">
                  PLACEHOLDER TEXT
                </textarea>
              </div>
              <div className="m-5">
                <label className="text-3xl align-top">Description:&#160;</label>
                <textarea className="text-xl z-50 bg-neutral-800 justify-center unna w-full">
                  PLACEHOLDER TEXT
                </textarea>
              </div>
              <div className="m-5">
                <label className="text-3xl align-top">Location:&#160;</label>
                <textarea className="text-xl z-50 bg-neutral-800 justify-center unna w-full">
                  PLACEHOLDER TEXT
                </textarea>
              </div>
              <div className="m-5">
                <label className="text-3xl align-top">Time:&#160;</label>
                <input type="date" className="bg-neutral-800 text-xl w-full" />
              </div>
              <div className="flex justify-center align-center px-4 pt-4 pb-8 basis-1/4">
                <button
                  type="submit"
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
