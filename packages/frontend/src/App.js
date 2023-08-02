import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/NewForm";
import UpcomingEvents from "./routes/UpcomingEvents";
import AdminHome from "./routes/dashboard/admin/AdminHome";
import AdminLayout from "./routes/dashboard/admin/AdminLayout";
import AdminEvents from "./routes/dashboard/admin/AdminEvents";
import AdminUsers from "./routes/dashboard/admin/AdminUsers";
import AdminNewEvent from "./routes/dashboard/admin/AdminNewEvent";
import EventDetails from "./routes/dashboard/admin/EventDetails";
import SignUp from "./routes/SignUp/SignUp";
import UserProfile from "./routes/User Profile/";
import FailedPayment from "./routes/FailedPayment";
import SuccessPayment from "./routes/SuccessPayment";

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
        </Route>
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="new-event" element={<AdminNewEvent />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
        </Route>
      </Routes>
    </div>
  );
}
