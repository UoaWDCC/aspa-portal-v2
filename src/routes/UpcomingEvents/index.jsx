import Heading from "./Heading";
import EventBoxLeft from "./EventBoxLeft";
import EventBoxRight from "./EventBoxRight";
import ViewAllEvents from "./ViewAllEvents";

export default function UpcomingEvents() {
  return (
    <div>
      <Heading />
      <EventBoxLeft />
      <EventBoxRight />
      <EventBoxLeft />
      <ViewAllEvents />
    </div>
  );
}
