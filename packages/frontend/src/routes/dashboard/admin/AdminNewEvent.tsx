import { Outlet } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminSideBar from "./AdminSidebar";

export default function Layout() {
  return (
    <>
      <AdminSideBar>
        {/* An <Outlet> renders the active route component, such as <Home /> or <Contact /> */}
        <Outlet />
      </AdminSideBar>
    </>
  );
}