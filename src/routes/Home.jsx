export default function Home() {
  return (
    <div className="flex flex-col gap-12 justify-center items-center h-full">
      <h1 className="text-7xl text-center">
        Auckland Students <br /> Pool Association
      </h1>
      <div className="grid gap-8 grid-cols-2 text-lg">
        <button className="border-white border-2 px-6 py-2">View Events</button>
        <button className="border-white bg-white text-gray-800 border-2 px-6 py-2">
          Join Us
        </button>
      </div>
    </div>
  );
}
