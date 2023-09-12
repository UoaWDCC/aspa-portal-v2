import React from "react";
import { motion } from "framer-motion";
import { fadeUpInView } from "../animation/utils";
import Events from "./Events";
import UserPoints from "./GetPoints";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <motion.div {...fadeUpInView()} className="isolate">
      <div className="flex flex-col gap-8 p-8 justify-center items-center">
        <h1 className="text-xl font-bold">
          Welcome back! {currentUser?.email}
          {console.log(currentUser)}
        </h1>
        <UserPoints />
        <Events />
      </div>
    </motion.div>
  );
};

export default UserProfile;
