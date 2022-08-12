import EventBoxLeft from "./EventBoxLeft";
import EventBoxRight from "./EventBoxRight";
import Heading from "./Heading";
import EventForm from "./EventForm";

export default function UpcomingEvents() {
  return (
    <div className="isolate">
      <Heading />
      <div className="flex flex-col gap-8 p-8 justify-center items-center">
        <EventBoxLeft objectId="62f59d7d8f37744d981e7608" />
        <EventBoxRight />
        <EventBoxLeft objectId="62f59d338f37744d981e7606" />
      </div>
    </div>
  );
}
