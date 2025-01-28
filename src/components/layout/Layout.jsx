import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideBar from "../Sidebar/Sidebar";
import Footer from "./Footer/Footer";
const Layout = () => {
  const isUserLoggedIn = true;
  return (
    <main className="">
      <Header />
      {isUserLoggedIn ? (
        <div className="mb-6">
          <SideBar>
            <Outlet />
          </SideBar>
        </div>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </main>
  );
};

export default Layout;
