import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import UpcomingEvents from "./routes/UpcomingEvents/index";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />}></Route>
      </Route>
    </Routes>
  );
}
