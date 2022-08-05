import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex md:justify-between px-12 py-6 sans">
        <div className="flex gap-8 w-full items-center justify-between md:justify-start md:w-auto">
          <Link to="/" className="flex gap-4 items-center">
            <img src={Logo} alt="" className="h-8" />
            <span className="font-bold text-lg">ASPA</span>
          </Link>
          <GiHamburgerMenu
            className="relative block md:hidden z-50 cursor-pointer"
            onClick={() => setIsOpen((v) => !v)}
            size={20}
          />
          <Link className="hidden md:block" to="/about">
            About
          </Link>
          <Link className="hidden md:block" to="/upcoming-events">
            Upcoming Events
          </Link>
        </div>
        <div className="hidden gap-8 font-bold items-center md:flex">
          <Link to="/" className="flex gap-2 items-center">
            <IoSearch size="20" />
            <span>Search</span>
          </Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 flex flex-col justify-center items-center p-4 gap-8 text-xl z-40 md:hidden">
          <Link onClick={() => setIsOpen(false)} to="/about">
            About
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/upcoming-events">
            Upcoming Events
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/login">
            Login
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/register">
            Register
          </Link>
        </div>
      )}
    </>
  );
}
