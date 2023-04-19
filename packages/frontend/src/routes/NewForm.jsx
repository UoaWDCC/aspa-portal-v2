import { useState } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = { name, email, paymentType };
    console.log(player);
    setIsPending(true);
    // Make API call or perform other actions here
  };

  return (
    <div className="create block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      {/* Info */}
      <h2>Register</h2>
      <p>
        Bring your cue skills, friends, and pool rivals for a casual night of
        pool! Limited availability so sign up to confirm your spot! (This form
        will close upon reaching capacity so if you're reading this it's not too
        late :D)
      </p>
      <p>Thursday 19th May 2022, 6:30 - 8:00 PM</p>
      <p>9 City Road, Orange Pool Club</p>
      <p>$6.00 with ASPA membership</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="paymentType">Payment Type:</label>
          <select
            id="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="bank transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {!isPending && <button type="submit">Register</button>}
        {isPending && <button disabled>Registering...</button>}
      </form>
    </div>
  );
};

export default Create;
