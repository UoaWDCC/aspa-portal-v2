import { motion } from "framer-motion";
import { useReducer, useRef } from "react";
import { fadeUpInView } from "../animation/utils";
import GeneralData from "./GeneralData";
import Payment from "./Payment";
import RegisterIntro from "./RegisterIntro";
import SpecificData from "./SpecificData";
import LoginData from "./LoginData";

import axios from "axios";

const Line = () => (
  <svg
    width="109"
    height="1"
    viewBox="0 0 109 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="0.5" x2="109" y2="0.5" stroke="white" />
  </svg>
);

export default function Register() {
  const formEl = useRef(null);

  const screens = [
    RegisterIntro,
    GeneralData,
    SpecificData,
    Payment,
    LoginData,
  ];

  const [activeScreen, setActiveScreen] = useReducer((state, action) => {
    switch (action) {
      case "next":
        return state >= 4 ? 4 : state + 1;
      case "prev":
        return state <= 0 ? 0 : state - 1;
      default:
        return state;
    }
  }, 0);

  const sendForm = async () => {
    const FD = new FormData(formEl.current);

    console.log(Array.from(FD.entries()));

    const data = Array.from(FD.entries());

    console.log(data[0]);
    try {
      axios.post("http://localhost:5000/user/register", {
        firstName: data[0][1],
        lastName: data[1][1],
        email: data[2][1],
        upi: data[3][1],
        skillLevel: "Beginner", // need to make this change
        previousMember: data[5][1] === "" ? false : true,
        username: data[6][1],
        password: data[7][1],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 w-full max-w-2xl mr-auto -z-10" />
      <main className="h-full w-full flex flex-col gap-8 max-w-2xl py-16 px-12">
        <motion.div
          {...fadeUpInView()}
          className="flex mx-12 gap-6 justify-between items-center text-5xl mb-8"
        >
          <span className={activeScreen === 0 && "text-yellow-400"}>i</span>
          <Line />
          <span className={activeScreen === 1 && "text-yellow-400"}>1</span>
          <Line />
          <span className={activeScreen === 2 && "text-yellow-400"}>2</span>
          <Line />
          <span className={activeScreen === 3 && "text-yellow-400"}>3</span>
          <Line />
          <span className={activeScreen === 4 && "text-yellow-400"}>4</span>
        </motion.div>
        <motion.form
          {...fadeUpInView(0.1)}
          action="."
          className="grid"
          ref={formEl}
        >
          {screens.map((ScreenComponent, i) => (
            <section
              className={`${
                i === activeScreen
                  ? "block opacity-100 translate-y-0"
                  : "none pointer-events-none opacity-0 translate-y-2"
              } transition row-span-full col-span-full duration-300`}
              key={ScreenComponent}
            >
              {ScreenComponent()}
            </section>
          ))}
        </motion.form>
        <motion.div {...fadeUpInView(0.2)} className="flex gap-6 mt-8">
          <button onClick={() => setActiveScreen("prev")}>Back</button>
          <button
            className="border-2 border-white rounded-sm px-4 py-2"
            onClick={() => setActiveScreen("next")}
          >
            Continue
          </button>
          <button onClick={sendForm}>Submit</button>
        </motion.div>
      </main>
    </>
  );
}
