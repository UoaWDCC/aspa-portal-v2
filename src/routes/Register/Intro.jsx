import { AiOutlineDollar } from "react-icons/ai";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";

export default function Intro() {
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
