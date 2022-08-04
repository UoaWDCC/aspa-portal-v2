import Heading from "./Heading";
import EventBoxLeft from "./EventBoxLeft";
import EventBoxRight from "./EventBoxRight";
import ViewEvents from "./ViewEvents";

export default function UpcomingEvents() {
  return (
    <div>
      <Heading />
      <div className="flex flex-col gap-8 p-8 justify-center items-center">
        <EventBoxLeft />
        <EventBoxRight />
        <EventBoxLeft />
        <ViewEvents />
      </div>
    </div>
  );
}
