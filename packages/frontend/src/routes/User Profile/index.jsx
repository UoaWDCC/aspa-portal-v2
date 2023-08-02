import React from "react";
import { motion } from "framer-motion";
import { fadeUpInView } from "../animation/utils";
import Events from "./Events";

const UserProfile = () => {
  return (
    <motion.div {...fadeUpInView()} className="isolate">
      <div className="flex flex-col gap-8 p-8 justify-center items-center">
        <h1 className="text-xl font-bold">Profile Page</h1>
        <Events />
      </div>
    </motion.div>
  );
};

export default UserProfile;
