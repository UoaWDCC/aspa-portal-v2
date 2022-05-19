export default function Heading() {
  const headingStyle = {
    display: "flex",
    justifyContent: "center",
    fontSize: "3.5rem",
    color: "#ffffff",
    margin: "2rem",
  };

  return (
    <div style={headingStyle}>
      <button>Upcoming Events</button>
    </div>
  );
}
