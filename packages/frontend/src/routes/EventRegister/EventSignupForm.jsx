import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FormStyles.css";
import { AiOutlineDollar } from "react-icons/ai";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { fadeUpInView } from "../animation/utils";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";

const Create = () => {
  const [event, setEvent] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentType, setPaymentType] = useState("online payment");
  const [isPending, setIsPending] = useState(false);
  const url = useLocation();
  const queryParams = new URLSearchParams(url.search);
  const eventId = queryParams.get("eventId");
  const { currentUser, uid } = useContext(AuthContext);
  const [points, setPoints] = useState(null);

  const [loading, setLoading] = useState(true);

  // This gets the event data for the form
  useEffect(() => {
    async function fetchEvent() {
      const response = await axios.get(
        `http://localhost:5000/events/${eventId}`
      );
      const data = response.data;
      setEvent(data);
      setLoading(false);
      console.log(data);
    }
    async function fetchUserPoints() {
      try {
        const token = await currentUser.getIdToken();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/points`,
          { headers }
        );
        console.log(response);
        setPoints(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserPoints();
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await currentUser.getIdToken();
    const headers = { Authorization: `Bearer ${token}` };
    const player = { firstName, lastName, email, paymentType, eventId };
    setIsPending(true);
    console.log("payment type: " + paymentType);

    if (paymentType == "cash") {
      try {
        console.log("try register");
        const response = await axios.post(
          "http://localhost:5000/register",
          player,
          { headers }
        );
        console.log(response.data);
        setIsPending(false);
      } catch (error) {
        console.log(error);
        setIsPending(false);
      }
    } else if (paymentType == "points") {
      try {
        console.log("try register");
        const response = await axios.post(
          "http://localhost:5000/register",
          player,
          { headers }
        );
        console.log(response.data);

        // Deduct 5 points from the user
        // set the body parameters pointsRemoved to 5
        const bodyParameters = { pointsRemoved: 5 };
        const response2 = await axios.patch(
          `${process.env.REACT_APP_API_URL}/users/points/remove`,
          bodyParameters,
          { headers }
        );

        console.log(response2.data);
        setIsPending(false);
      } catch (error) {
        console.log(error);
        setIsPending(false);
      }
    } else {
      // Payment type is online payment
      try {
        console.log("try stripe");
        console.log(currentUser);
        console.log("id: " + uid);
        const response = await axios.post(
          `http://localhost:5000/payment/create-checkout-session/${uid}/${eventId}`,
          player
        );
        console.log(response.data);

        // Redirect the user to the Stripe checkout page
        window.location.href = response.data.redirect;
      } catch (error) {
        console.log(error);
        setIsPending(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="spinner">
          <TailSpin color="#ffffff" height={100} width={100} timeout={5000} />
        </div>
      ) : (
        <>
          <div className="fixed -z-50 inset-0 bg-black bg-opacity-50"></div>
          <motion.div {...fadeUpInView()} className="create mx-auto pt-10 ">
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
              <h1>Register for {event.eventTitle}</h1>
              <p>{event.eventDescription}</p>
            </div>
            <div className="flex flex-col gap-4 text-lg text-gray-300">
              <div className="flex gap-4 align-middle">
                <IoTimeOutline size={24} />
                <p className="my-auto">{event.eventTime}</p>
              </div>
              <div className="flex gap-4 align-middle">
                <IoLocationOutline size={24} />
                <p className="my-auto">{event.eventLocation}</p>
              </div>
              <div className="flex gap-4 align-middle">
                <AiOutlineDollar size={24} />
                <p className="my-auto">$6.00 with ASPA membership</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 max-w-2xl"
            >
              <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="grid grid-rows-2 gap-0">
                  <label htmlFor="name" className="pt-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    className="bg-transparent px-3 py-2 border-2 rounded-lg h-10 mb-0"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid grid-rows-2 gap-0">
                  <label htmlFor="name" className="pt-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    className="bg-transparent px-3 py-2 border-2 rounded-lg h-10 mb-0"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="email" className="mt-0">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                className="bg-transparent px-3 py-2 border-2 rounded-lg h-10"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="paymentType">Payment Options:</label>
              <select
                id="paymentType"
                value={paymentType}
                className="bg-transparent px-3 py-2 border-2 rounded-lg"
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option className="option" value="online payment">
                  Online Payment
                </option>
                <option className="option" value="cash">
                  Cash
                </option>
                {/*display another option to use points but only if its above 5 */}
                {points >= 5 && (
                  <option className="option" value="points">
                    Redeem 5 Points for a Free Ticket
                  </option>
                )}
              </select>

              {!isPending && (
                <button
                  type="submit"
                  className="border-2 border-white rounded-full text-lg px-12 py-1 mt-10 mb-10 w-[80%] mx-auto hover:text-black hover:bg-white transition duration-300 ease-in-out"
                >
                  Register
                </button>
              )}
              {isPending && <button disabled>Registering...</button>}
            </form>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Create;
