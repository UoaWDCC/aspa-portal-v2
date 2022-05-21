import { useReducer } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";

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

function Intro() {
  return (
    <>
      <div className="prose prose-lg prose-h1:text-6xl prose-h1:mb-[0.63em] prose-invert mb-8">
        <h1>Register</h1>
        <p>
          Bring your cue skills, friends, and pool rivals for a casual night of
          pool! Limited availability so sign up to confirm your spot! (This form
          will close upon reaching capacity so if you're reading this it's not
          too late :D)
        </p>
      </div>
      <div className="flex flex-col gap-4 text-lg text-gray-300">
        <div className="flex gap-4 align-middle">
          <IoTimeOutline size={24} />
          <p className="my-auto">Thursday 19th May 2022, 6:30 - 8:00 PM</p>
        </div>
        <div className="flex gap-4 align-middle">
          <IoLocationOutline size={24} />
          <p className="my-auto">9 City Road, Orange Pool Club</p>
        </div>
        <div className="flex gap-4 align-middle">
          <AiOutlineDollar size={24} />
          <p className="my-auto">$6.00 with ASPA membership</p>
        </div>
      </div>
    </>
  );
}

function GeneralData() {
  return (
    <>
      <aside className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="firstName">First Name</label>
            <input
              className="bg-transparent px-3 py-2 border-2 rounded-lg"
              type="text"
              placeholder="John"
              name="firstName"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="firstName">Last Name</label>
            <input
              className="bg-transparent px-3 py-2 border-2 rounded-lg"
              type="text"
              placeholder="Doe"
              name="lastName"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="firstName">Email</label>
          <input
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
            type="text"
            placeholder="johndoe@gmail.com"
            name="email"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="firstName">UPI</label>
          <input
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
            type="text"
            placeholder="jdoe727"
            name="upi"
          />
        </div>
      </aside>
    </>
  );
}
function SpecificData() {
  return <h1>Second Section</h1>;
}
function Payment() {
  return <h1>Third section</h1>;
}
