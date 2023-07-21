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
        </Route>
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="new-event" element={<AdminNewEvent />} />
        </Route>
      </Routes>
    </div>
  );
}
