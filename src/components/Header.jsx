import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Dashboard</Link>
        </li>
        <li>
          <Link to="/upcoming-events">Upcoming Events</Link>
        </li>
      </ul>
    </nav>
  );
}
