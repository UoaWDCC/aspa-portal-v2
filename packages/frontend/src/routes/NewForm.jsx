import { useState } from "react";
import { Link } from "react-router-dom";
import "./FormStyles.css";

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = { firstName, lastName, email, paymentType };
    console.log(player);
    setIsPending(true);
    // Make API call or perform other actions here
  };

  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 form">
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
      <h1 className="title">Registration Form</h1>
      <p>
        Bring your cue skills, friends, and pool rivals for a casual night of
        pool! Limited availability so sign up to confirm your spot! (This form
        will close upon reaching capacity so if you're reading this it's not too
        late :D)
      </p>
      <br />
      <p>Time: Thursday 19th May 2022, 6:30 - 8:00 PM</p>
      <br />
      <p>Location: 9 City Road, Orange Pool Club</p>
      <br />
      <p>$6.00 with ASPA membership</p>
      <br />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 width">
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              FIrst name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              type="text"
              id="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              type="text"
              id="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@email.com"
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="paymentType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Payment Type:
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="bank transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <br />

        {!isPending && (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
        )}
        {isPending && <button disabled>Registering...</button>}
      </form>
    </div>
  );
};

export default Create;
