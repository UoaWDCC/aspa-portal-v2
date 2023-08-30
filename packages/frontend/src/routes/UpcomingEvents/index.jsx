import { motion } from "framer-motion";
import { fadeUpInView } from "../animation/utils";
import Event from "../../components/Event";
import Heading from "./Heading";

export default function UpcomingEvents() {
  return (
    <motion.div {...fadeUpInView()} className="isolate">
      <Heading />
      <Event />
    </motion.div>
  );
}
