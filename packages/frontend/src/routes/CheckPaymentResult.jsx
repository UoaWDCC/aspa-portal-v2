import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      // Call the backend to confirm the payment status using the session ID
      axios
        .post("/payment-confirmation", { sessionId })
        .then((response) => {
          if (response.data.success) {
            navigate("/success-payment");
          } else {
            navigate("/failed-payment");
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/failed-payment");
        });
    } else {
      navigate("/failed-payment");
    }
  }, []);
  return <></>;
}
