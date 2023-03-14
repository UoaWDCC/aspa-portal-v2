import { motion } from "framer-motion";
import { fadeUpInView } from "../animation/utils";
import EventBox from "./EventBox";
import Heading from "./Heading";

export default function UpcomingEvents() {
  return (
    <motion.div {...fadeUpInView()} className="isolate">
      <Heading />
      <div className="flex flex-col gap-8 p-8 justify-center items-center">
        <EventBox objectId="62f59d7d8f37744d981e7608" />
        <EventBox objectId="62fecfe1a6db3bf5cbc6b938" />
        <EventBox objectId="62f59d338f37744d981e7606" />
      </div>
    </motion.div>
  );
}
