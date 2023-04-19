import { useState } from "react";
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
      {/* Info */}
      <h1 className="title">Registration Form</h1>
      <br />
      <p>
        Bring your cue skills, friends, and pool rivals for a casual night of
        pool! Limited availability so sign up to confirm your spot! (This form
        will close upon reaching capacity so if you're reading this it's not too
        late :D)
      </p>
      <br />
      <p>Thursday 19th May 2022, 6:30 - 8:00 PM</p>
      <br />
      <p>9 City Road, Orange Pool Club</p>
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
