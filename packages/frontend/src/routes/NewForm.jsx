import { useState } from "react";
import { useLocation } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentType, setPaymentType] = useState("");
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
    <div className="create">
      {/* Info */}
      <h2>Register for {title}</h2>
      <p>{description}</p>
      <p>Date: {date}</p>
      <p>Location: {location}</p>
      <p>$6.00 with ASPA membership</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="paymentType">Payment Type:</label>
        <select
          id="paymentType"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="bank transfer">Bank Transfer</option>
          <option value="cash">Cash</option>
        </select>

        {!isPending && <button type="submit">Register</button>}
        {isPending && <button disabled>Registering...</button>}
      </form>
    </div>
  );
};

export default Create;
