import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Register from "./routes/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
