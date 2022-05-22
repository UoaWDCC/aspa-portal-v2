export default function EventBoxLeft() {
  return (
    <div className="w-4/5 my-12 mx-auto h-100 text-white flex bg-neutral-900">
      <div className="flex justify-center align-center overflow-hidden border-solid border-2 border-white basis-1/3">
        <img
          src={require("./images/testImg.jpg")}
          alt="Image of pool table"
          className="flex-shrink-0 min-w-full min-h-full"
        />
      </div>
      <div className="border-solid border-2 border-white basis-2/3 flex flex-col">
        <div className="text-center text-6xl text-white basis-1/4 p-4">
          <h2>Event A</h2>
        </div>
        <div className="text-center text-base text-white basis-1/4">
          <h3>
            Bringe your cue skills, friends and pool rivals for a casual night
            of pool.
            <br />
            $6.00 with ASPA membership
          </h3>
        </div>
        <div className="text-center basis-1/4 text-neutral-300">
          <h4>9 CITY ROAD . ORANGE POOL CLUB</h4>
          <h4>THURSDAY . 19/05 6:30PM - 8:30PM</h4>
        </div>
        <div className="flex justify-center align-center basis-1/4">
          <button className="text-base border-solid border-2 border-white px-40 h-12">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
