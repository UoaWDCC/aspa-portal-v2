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
      <h1>Upcoming Events</h1>
    </div>
  );
}
