import { useState } from "react";
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
