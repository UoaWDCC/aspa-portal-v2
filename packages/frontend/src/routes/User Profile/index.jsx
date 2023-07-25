import React from "react";
import { motion } from "framer-motion";
import { fadeUpInView } from "../animation/utils";

const UserProfile = () => {
  return (
    <motion.div {...fadeUpInView()} className="isolate">
      <div className="flex flex-col gap-8 p-8 justify-center items-center">
        <h1>Profile Page</h1>
      </div>
    </motion.div>
  );
};

export default UserProfile;
