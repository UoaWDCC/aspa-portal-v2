import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSidebar.tsx";

export default function Layout() {
  return (
    <>
      <AdminSideBar />
      {/* An <Outlet> renders the active route component, such as <Home /> or <Contact /> */}
      <Outlet />
    </>
  );
}
