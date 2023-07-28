import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUpInView } from "./animation/utils";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex flex-col gap-12 justify-center items-center h-full">
      <motion.h1 {...fadeUpInView()} className="text-7xl text-center">
        Auckland Students <br /> Pool Association
      </motion.h1>
      <motion.div
        {...fadeUpInView(0.15)}
        className="grid gap-8 grid-cols-2 text-lg text-center"
      >
        <Link
          to="/upcoming-events"
          className="border-white rounded-sm border-2 px-6 py-2"
        >
          View Events
        </Link>
        {console.log(currentUser)}
        {currentUser ? (
          <Link
            to="my-profile"
            className="border-white bg-white rounded-sm text-gray-800 border-2 px-6 py-2"
          >
            My Account
          </Link>
        ) : (
          //TODO: check if the user is login, if not then show the Join Us button which should link to sign up page. If the user has logged in then dont show the Join Us button
          <Link
            to="register"
            className="border-white bg-white rounded-sm text-gray-800 border-2 px-6 py-2"
          >
            Join Us
          </Link>
        )}
      </motion.div>
    </div>
  );
}
