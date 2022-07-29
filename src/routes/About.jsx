import MyImage from "./UpcomingEvents/images/ASPA_logo_inverted.png";

export default function About() {
  return (
    <>
      <div className="mx-32 py-28 prose text-white">
        <div className="w-3/4 overflow-x-auto">
          <h5 className="text-white leading-none mb-2">WHO ARE WE?</h5>
          <h1 className="text-white leading-none">
            Auckland Student Pool Association
          </h1>
          <p className="max-w-[75ch]">
            The Auckland Student Pool Association (ASPA), based in the
            University of Auckland, focuses on faciliating a supporting
            environment that brings people together who are passionate about
            pool and aims to promote billiard sports. We hold casual events,
            coaching events, and tournaments, connecting members that are
            interested in playing against other members in a competitive and
            social environment.
          </p>
        </div>
      </div>

      <div>
        <img src={MyImage} alt="logo" />
      </div>
    </>
  );
}
