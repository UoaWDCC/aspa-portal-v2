export default function EventBoxLeft() {
  const container = {
    backgroundColor: "#212121",
    width: "80%",
    margin: "3rem auto",
    height: "22rem",
    color: "#ffffff",
    display: "flex",
  };

  const eventNameStyling = {
    textAlign: "center",
    fontSize: "4rem",
    color: "#FFFFFF",
    flexBasis: "25%",
  };

  const eventDescriptionStyling = {
    textAlign: "center",
    fontSize: "1rem",
    color: "#FFFFFF",
    flexBasis: "25%",
  };

  const eventDetailsStyling = {
    textAlign: "center",
    color: "#C4C4C4",
    flexBasis: "20%",
  };

  const rightColumn = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    border: "0.2rem solid white",
    flexBasis: "30%",
  };

  const imgStyling = {
    flexShrink: "0",
    minWidth: "100%",
    minHeight: "100%",
  };

  const leftColumn = {
    border: "0.2rem solid white",
    flexBasis: "70%",
    display: "flex",
    flexDirection: "column",
  };

  const buttonDivStyling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "30%",
  };

  const registerButtonStyling = {
    fontSize: "1rem",
    border: "0.2rem solid white",
    padding: "0.5rem 5rem 0.5rem 5rem",
  };

  return (
    <div style={container}>
      <div style={leftColumn}>
        <div style={eventNameStyling}>
          <h2>Event A</h2>
        </div>
        <div style={eventDescriptionStyling}>
          <h3>
            Bringe your cue skills, friends and pool rivals for a casual night
            of pool.
            <br />
            $6.00 with ASPA membership
          </h3>
        </div>
        <div style={eventDetailsStyling}>
          <h4>9 CITY ROAD . ORANGE POOL CLUB</h4>
          <h4>THURSDAY . 19/05 6:30PM - 8:30PM</h4>
        </div>
        <div style={buttonDivStyling}>
          <button style={registerButtonStyling}>Register</button>
        </div>
      </div>
      <div style={rightColumn}>
        <img
          src={require("./images/testImg.jpg")}
          alt="Image of pool table"
          styling={imgStyling}
        />
      </div>
    </div>
  );
}
