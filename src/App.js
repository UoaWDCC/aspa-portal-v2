import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Register from "./routes/Register";
import UpcomingEvents from "./routes/UpcomingEvents";

export default function App() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
        </Route>
      </Routes>
    </div>
  );
}
