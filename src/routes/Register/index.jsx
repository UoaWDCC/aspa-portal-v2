import { useReducer } from "react";
import GeneralData from "./GeneralData";
import Intro from "./Intro";
import Payment from "./Payment";
import SpecificData from "./SpecificData";

export default function Register() {
  const screens = [Intro, GeneralData, SpecificData, Payment];

  const [activeScreen, setActiveScreen] = useReducer((state, action) => {
    switch (action) {
      case "next":
        return state >= 3 ? 3 : state + 1;
      case "prev":
        return state <= 0 ? 0 : state - 1;
      default:
        return state;
    }
  }, 0);

  return (
    <main className="h-full w-full flex flex-col gap-8 max-w-2xl bg-gray-900 py-16 px-12">
      <div>
        {["i", 1, 2, 3].map((val, i) => (
          <span key={val} className={i === activeScreen && "text-yellow-400"}>
            {val}
          </span>
        ))}
      </div>
      <form action="." className="grid">
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
      </form>
      <div className="flex gap-6 mt-8">
        <button onClick={() => setActiveScreen("prev")}>Back</button>
        <button
          className="border-2 border-white px-4 py-2"
          onClick={() => setActiveScreen("next")}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
