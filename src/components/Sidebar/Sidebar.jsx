/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FaAmazonPay, FaBars, FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { BsShop, BsPeopleFill } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { TbBuildingCommunity } from "react-icons/tb";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
// import { FiUsers } from "react-icons/fi";
// import useAuth from "../../../hooks/useAuth";
import { LuWallpaper } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { Fa42Group, FaAddressBook, FaQuestion } from "react-icons/fa6";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  // {
  //   path: "/client",
  //   name: "Client Panel",
  //   icon: <Fa42Group />,
  //   subRoutes: [
  //     {
  //       path: "/client/homeBanners",
  //       name: "Home Banner",
  //       icon: <LuWallpaper />,
  //     },
  //     {
  //       path: "/client/eventBanners",
  //       name: "Shows/Events Banner",
  //       icon: <LuWallpaper />,
  //     },
  //     { path: "/client/faqs", name: "FAQs", icon: <FaQuestion /> },
  //     {
  //       path: "/client/listYourEvent",
  //       name: "List Your Event",
  //       icon: <FaQuestion />,
  //     },
   
  //   ],
  // },


  {
    path: "/client",
    name: "Portfolio",
    icon: <Fa42Group />,
    subRoutes: [
      {
 
      },
      {
        path: "/co-invester",
        name: "co-invester",
        icon: <LuWallpaper />,
      },
      { path: "/Co-InvestorView", name: "FAQs", icon: <FaQuestion /> },
      {
        path: "/client/listYourEvent",
        name: "List Your Event",
        icon: <FaQuestion />,
      },
   
    ],
  },
  {
    path: "/news",
    name: "News",
    icon: <FaAddressBook />,
    subRoutes: [
      {
        path: "/news",
        name: "List News",
        icon: <LuWallpaper />,
      },
      {
        path: "/news/add-news",
        name: "Add News",
        icon: <LuWallpaper />,
      },
    ],
  },
  {
    path: "/team",
    name: "Team",
    icon: <FaAmazonPay />,
    subRoutes: [
      {
        path: "/team",
        name: "List Team",
        icon: <LuWallpaper />,
      },
      {
        path: "/team/add-team",
        name: "Add Team",
        icon: <LuWallpaper />,
      },
 
    ],
  },
];

// const userVendorRoutes = [
//   { path: "/", name: "Dashboard", icon: <FaHome /> },
//   { path: "/venues", name: "Venue", icon: <TbBuildingCommunity /> },
//   { path: "/category", name: "Category", icon: <BiSolidCategory /> },
//   { path: "/organiser", name: "Organiser", icon: <BsPeopleFill /> },
// ];

const SideBar = ({ children }) => {
  //   const { isUserLoggedIn, loggedInUserData } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.05 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.05 } },
  };

  return (
    <div className="flex h-screen">
      <motion.div
        animate={{ width: isOpen ? "200px" : "60px" }}
        className="h-screen bg-red-800 text-white transition-all duration-50 flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 ">
          {isOpen && <h1 className="text-xl font-bold"> Sidebar </h1>}
          <button
            onClick={toggleSidebar}
            className="text-lg focus:outline-none hover:text-blue-700"
          >
            <FaBars />
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto">
          {routes.map((route, index) => (
            <div key={index}>
              {route.subRoutes ? (
                <SidebarMenu
                  route={route}
                  isOpen={isOpen}
                  showAnimation={showAnimation}
                />
              ) : (
                <NavLink
                  to={route.path}
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <div className="mr-3">{route.icon}</div>
                  {isOpen && <span>{route.name}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </motion.div>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default SideBar;
