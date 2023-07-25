import failedImage from "../assets/paymentfailed.png";
import { Link } from "react-router-dom";

export default function FailedPayment() {
  return (
    <>
      <div className="fixed -z-50 inset-0 bg-black bg-opacity-60"></div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <img
            className="w-64 h-64"
            src={failedImage}
            alt="payment failed image"
          />
        </div>
        <h1 className="mt-10 mb-10 text-xl">
          Oops looks like there was an issue with your payment, would you like
          to try again?
        </h1>
        <div className="flex flex-row justify-center gap-4 items-center w-full">
          <Link to="/upcoming-events">
            <button className="border-2 border-white rounded-full text-lg px-12 py-2 w-80 hover:text-black hover:bg-white transition duration-300 ease-in-out">
              Try Again
            </button>
          </Link>
          <Link to="/">
            <button className="border-2 border-white rounded-full text-lg px-12 py-2 w-80 hover:text-black hover:bg-white transition duration-300 ease-in-out">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
