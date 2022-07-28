import aspaLogo from "./images/ASPA_logo_inverted.png";
import "./assets/fonts.css";

export default function EventBoxLeft() {
  return (
    <div className="w-4/5 h-1/2 text-white flex flex-col md:flex-row flex-wrap bg-neutral-900 overflow-hidden last:mb-10">
      <div className="flex justify-center align-center overflow-hidden border-solid border-2 border-white basis-1/3">
        <img
          src={require("./images/testImg.jpg")}
          alt="Image of pool table"
          className="flex-shrink-0 min-w-full min-h-full overflow-hidden"
        />
      </div>
      <div className="relative border-solid border-2 border-white md:basis-2/3 flex flex-col overflow-hidden">
        <img src={aspaLogo} alt="" className="absolute bottom-0 right-0" />
        <div className="text-center text-6xl text-white basis-1/4 p-4 playfair">
          <h2>Event A</h2>
        </div>
        <div className="text-center text-base text-white basis-1/4 p-4 unna">
          <h3>
            Bring your cue skills, friends and pool rivals for a casual night of
            pool.
            <br />
            $6.00 with ASPA membership
          </h3>
        </div>
        <div className="text-center basis-1/4 text-neutral-300 p-4 unna">
          <h4>9 CITY ROAD . ORANGE POOL CLUB</h4>
          <h4>THURSDAY . 19/05 6:30PM - 8:30PM</h4>
        </div>
        <div className="flex justify-center align-center px-4 pt-4 pb-8 basis-1/4">
          <button className="text-base border-solid border-2 border-white w-4/5 h-12 playfair">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
