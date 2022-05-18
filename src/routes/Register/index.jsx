import { useReducer } from "react";

export default function Register() {
  const screens = [Intro, GeneralData, SpecificData, Payment];

  const [screen, sendScreenAction] = useReducer((state, action) => {
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
    <main className="h-full w-full max-w-2xl bg-gray-900 py-16 px-12">
      {screen !== 0 && (
        <div>
          {[1, 2, 3].map((val, i) => (
            <span key={val} className={i + 1 === screen && `text-yellow-400`}>
              {val}
            </span>
          ))}
        </div>
      )}
      {screens[screen]()}
      <div className="flex gap-2 mt-8">
        <button onClick={() => sendScreenAction("prev")}>prev</button>
        <button onClick={() => sendScreenAction("next")}>next</button>
      </div>
    </main>
  );
}

function Intro() {
  return <h1>Register Section</h1>;
}

function GeneralData() {
  return (
    <>
      <aside className="flex flex-col gap-8 ">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName">First Name</label>
            <input
              className="bg-transparent px-3 py-2 border-2 rounded-lg"
              type="text"
              placeholder="John"
              name="firstName"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName">Last Name</label>
            <input
              className="bg-transparent px-3 py-2 border-2 rounded-lg"
              type="text"
              placeholder="Doe"
              name="lastName"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName">Email</label>
          <input
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
            type="text"
            placeholder="johndoe@gmail.com"
            name="email"
          />
        </div>
        <div className="flex flex-col gap-1">
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
