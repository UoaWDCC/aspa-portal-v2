import React, { useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { useContext } from "react";

function UserPoints() {
  const [points, setPoints] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const token = await currentUser.getIdToken();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/points`,
          { headers }
        );
        console.log(response);
        setPoints(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPoints();
  }, []);

  return (
    <div>
      {points !== null ? <p>Reward Points: {points}</p> : <p>Loading...</p>}
    </div>
  );
}

export default UserPoints;
