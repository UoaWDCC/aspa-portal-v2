import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/NewForm";
import UpcomingEvents from "./routes/UpcomingEvents";
import SignUp from "./routes/SignUp/SignUp";
import UserProfile from "./routes/User Profile/";
import FailedPayment from "./routes/FailedPayment";
import SuccessPayment from "./routes/SuccessPayment";
import PaymentSuccess from "./routes/CheckPaymentResult";

export default function App() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-profile" element={<UserProfile />} />
          <Route path="/failed-payment" element={<FailedPayment />} />
          <Route path="/success-payment" element={<SuccessPayment />} />
          <Route path="/check-payment-result" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </div>
  );
}
