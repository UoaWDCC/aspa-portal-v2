import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { IoAddOutline, IoCalendarOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-24 bg-gray-800 absolute top-0 left-0">
      <nav className="flex flex-col items-center justify-between w-full h-full p-4 pt-6 pb-6">
        <Link to="/admin-dashboard">
          <img src={Logo} alt="" className="src" />
          _______
        </Link>
        <ul className="flex flex-col items-center justify-between gap-5">
          <div>
            <Link
              to="/admin-dashboard/users"
              className={`hover:text-sky-700 ${
                location.pathname === "/admin-dashboard/users"
                  ? "text-sky-400"
                  : ""
              }`}
            >
              <AiOutlineUser size={40} />
            </Link>
          </div>
          <div>
            <Link
              to="/admin-dashboard/new-event"
              className={`hover:text-sky-700 ${
                location.pathname === "/admin-dashboard/new-event"
                  ? "text-sky-400"
                  : ""
              }`}
            >
              <IoAddOutline size={50} />
            </Link>
          </div>
          <div>
            <Link
              to="/admin-dashboard/events"
              className={`hover:text-sky-700 ${
                location.pathname === "/admin-dashboard/events"
                  ? "text-sky-400"
                  : ""
              }`}
            >
              <IoCalendarOutline size={38} />
            </Link>
          </div>
        </ul>
        <div className="flex flex-col items-center justify-between gap-2">
          <FaFacebookSquare size={34} />
          <FaLinkedin size={34} />
        </div>
      </nav>
    </div>
  );
}
