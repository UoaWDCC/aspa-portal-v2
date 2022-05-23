import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <nav className="font-['Poppins'] font-normal text-sm bottom-0 ml-10 mb-8 mt-auto leading-10">
      <ul>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/contact">contact us</Link>
        </li>
        <li>
          <Link to="/register">terms and conditions</Link>
        </li>
      </ul>
    </nav>
  );
}
