import MyImage from "./UpcomingEvents/images/ASPA_logo_inverted.png";

export default function About() {
  return (
    <div className="mx-32 pt-8 pb-28">
      <div className="flex items-center">
        <div className="prose text-white ">
          <h5 className="text-white leading-none mb-2">WHO ARE WE?</h5>
          <h1 className="text-white leading-none text-5xl mb-0">
            Auckland Student Pool Association
          </h1>
        </div>
        <img className="max-w-[40%]" src={MyImage} alt="logo" />
      </div>
      <div>
        <p className="max-w-[100ch] text-xl">
          The Auckland Student Pool Association (ASPA), based at the University
          of Auckland, focuses on facilitating a supporting environment that
          brings people together who are passionate about pool and aims to
          promote billiard sports. We hold casual events, coaching events, and
          tournaments, connecting members that are interested in playing against
          other members in a competitive and social environment.
        </p>
      </div>
    </div>
  );
}
