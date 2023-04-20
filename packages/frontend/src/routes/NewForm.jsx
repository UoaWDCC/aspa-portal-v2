import { useState } from "react";
import { Link } from "react-router-dom";
import "./FormStyles.css";
import { AiOutlineDollar } from "react-icons/ai";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentType, setPaymentType] = useState("bank transfer");
  const [isPending, setIsPending] = useState(false);
  const url = useLocation();
  const queryParams = new URLSearchParams(url.search);
  //const eventId = queryParams.get("eventId"); No point declaring eventId now. Can just do following in API call -> queryParams.get("eventId")
  const title = queryParams.get("title");
  const date = queryParams.get("date");
  const description = queryParams.get("description");
  const location = queryParams.get("location");

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = { name, email, paymentType };
    console.log(player);
    setIsPending(true);
    // Make API call or perform other actions here
  };

  return (
    <div className="create px-16 pt-10">
      <Link to="/upcoming-events" className="back_button">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.125 19.1L0.700003 10.7C0.600003 10.6 0.529003 10.4917 0.487003 10.375C0.445003 10.2584 0.424337 10.1334 0.425003 10C0.425003 9.86669 0.44567 9.74169 0.487003 9.62502C0.528337 9.50836 0.599336 9.40002 0.700003 9.30002L9.125 0.875024C9.35834 0.641691 9.65 0.525024 10 0.525024C10.35 0.525024 10.65 0.650024 10.9 0.900024C11.15 1.15002 11.275 1.44169 11.275 1.77502C11.275 2.10836 11.15 2.40002 10.9 2.65002L3.55 10L10.9 17.35C11.1333 17.5834 11.25 17.871 11.25 18.213C11.25 18.555 11.125 18.8507 10.875 19.1C10.625 19.35 10.3333 19.475 10 19.475C9.66667 19.475 9.375 19.35 9.125 19.1Z"
            fill="white"
          />
        </svg>
      </Link>
      {/* Info */}
      <div className="prose prose-lg prose-h1:text-6xl prose-h1:mb-[0.63em] prose-invert mb-8">
        <h1>Register for {title}</h1>
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-2xl">
        <label htmlFor="name" className="mt-10">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          className="bg-transparent px-3 py-2 border-2 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          className="bg-transparent px-3 py-2 border-2 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="paymentType">Payment Type:</label>
        <select
          id="paymentType"
          value={paymentType}
          className="bg-transparent px-3 py-2 border-2 rounded-lg"
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="bank transfer">Bank Transfer</option>
          <option value="cash">Cash</option>
        </select>

        {!isPending && (
          <button type="submit" className="mt-4 hover:opacity-50 ">
            Register
          </button>
        )}
        {isPending && <button disabled>Registering...</button>}
      </form>
    </div>
  );
};

export default Create;
