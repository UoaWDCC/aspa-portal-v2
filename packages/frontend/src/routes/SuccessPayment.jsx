import successImage from "../assets/paymentsuccess.png";
import { Link } from "react-router-dom";

export default function SuccessPayment() {
  return (
    <>
      <div className="fixed -z-50 inset-0 bg-black bg-opacity-60"></div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <img
            className="w-64 h-64"
            src={successImage}
            alt="payment failed image"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 items-center w-full">
          <h1 className="mt-10 mb-5 text-xl">
            You're all set! We'll see you at the event!
          </h1>
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
