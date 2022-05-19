export default function ViewAllEvents() {
  const buttonDivStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5rem",
  };

  const viewAllElementsButtonStyle = {
    fontSize: "1rem",
    border: "0.2rem solid white",
    padding: "0.5rem 5rem 0.5rem 5rem",
    color: "#FFFFFF",
  };

  return (
    <div style={buttonDivStyle}>
      <button style={viewAllElementsButtonStyle}>View All Events</button>;
    </div>
  );
}
