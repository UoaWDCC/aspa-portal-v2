import { AiOutlineDollar } from "react-icons/ai";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export default function RegisterIntro() {
  const url = useLocation();
  const queryParams = new URLSearchParams(url.search);
  //const eventId = queryParams.get("eventId"); No point declaring eventId now. Can just do following in API call -> queryParams.get("eventId")
  const title = queryParams.get("title");
  const date = queryParams.get("date");
  const description = queryParams.get("description");
  const location = queryParams.get("location");

  return (
    <>
      <div className="prose prose-lg prose-h1:text-6xl prose-h1:mb-[0.63em] prose-invert mb-8">
        <h1>Register to {title}</h1>
        <p>{description}</p>
      </div>
      <div className="flex flex-col gap-4 text-lg text-gray-300">
        <div className="flex gap-4 align-middle">
          <IoTimeOutline size={24} />
          <p className="my-auto">{date}</p>
        </div>
        <div className="flex gap-4 align-middle">
          <IoLocationOutline size={24} />
          <p className="my-auto">{location}</p>
        </div>
        <div className="flex gap-4 align-middle">
          <AiOutlineDollar size={24} />
          <p className="my-auto">$6.00 with ASPA membership</p>
        </div>
      </div>
    </>
  );
}
