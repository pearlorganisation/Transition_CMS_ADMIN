/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FaAmazonPay, FaBars, FaHome } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { LuWallpaper } from "react-icons/lu";
import { Fa42Group, FaAddressBook, FaQuestion } from "react-icons/fa6";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
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
      {
        path: "/teamDetails",
        name: "List Team Details",
        icon: <LuWallpaper />,
      },
      {
        path: "/teamDetails/add-teamDetails",
        name: "Add Team Details",
        icon: <LuWallpaper />,
      },
    ],
  },
  {
    path: "/",
    name: "Insights",
    icon: <FaAmazonPay />,
    subRoutes: [
      {
        path: "/press",
        name: "Press",
        icon: <LuWallpaper />,
      },
      {
        path: "/articles",
        name: "Articles",
        icon: <LuWallpaper />,
      },
      {
        path: "/podcast",
        name: "Podcast",
        icon: <LuWallpaper />,
      },
    ],
  },

  {
    path: "/focusarea",
    name: "Focus Area",
    icon: <FaAmazonPay />,
    subRoutes: [
      {
        path: "/focusareafeature",
        name: "List Focus Area Features",
        icon: <LuWallpaper />,
      },
      {
        path: "/focusarea/add-focusareafeature",
        name: "Add Focus Area Feature",
        icon: <LuWallpaper />,
      },
      {
        path: "/focusarea",
        name: "List Focus Areas",
        icon: <LuWallpaper />,
      },
      {
        path: "/focusarea/add-focusarea",
        name: "Add Focus Area",
        icon: <LuWallpaper />,
      },
    ],
  },

  {
    path: "/portfolios",
    name: "Portfolios",
    icon: <FaAmazonPay />,
    subRoutes: [
      {
        path: "/portfolios",
        name: "List All Portfolios",
        icon: <LuWallpaper />,
      },
      {
        path: "/portfolios/add-portfolio",
        name: "Add Portfolio",
        icon: <LuWallpaper />,
      },
      {
        path: "/portfolios/portfolio-cards",
        name: "List All Portfolio Cards",
        icon: <LuWallpaper />,
      },
      {
        path: "/portfolios/add-portfolio-card",
        name: "Add Portfolio Card",
        icon: <LuWallpaper />,
      },
      {
        path: "/portfolios/invest-timeline-cards",
        name: "List All Investment Timeline Cards",
        icon: <LuWallpaper />,
      },
      {
        path: "/portfolios/add-investment-timeline-card",
        name: "Add Investment Timeline Card",
        icon: <LuWallpaper />,
      },
      {
        path: "/portfolios/invest-timelines",
        name: "List Investment Timelines",
        icon: <LuWallpaper />,
      },

      {
        path: "/portfolios/add-investment-timeline",
        name: "Add Investment Timeline",
        icon: <LuWallpaper />,
      },

      {
        path: "/portfolios/add-coinvestor",
        name: "List Co Investors",
        icon: <LuWallpaper />,
      },
    ],
  },
  {
    path: "/",
    name: "Impact",
    icon: <FaAmazonPay />,
    subRoutes: [
      {
        path: "/esg",
        name: "ESGs",
        icon: <LuWallpaper />,
      },
      {
        path: "/mission",
        name: "Mission",
        icon: <LuWallpaper />,
      },
      {
        path: "/sdg",
        name: "SDGs",
        icon: <LuWallpaper />,
      },
      {
        path: "/policies",
        name: "Policies",
        icon: <LuWallpaper />,
      },

    ],

  },
  {
    path: "/contactUs",
    name: "Contact Us",
    icon: <LuWallpaper />,
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
    <div className=" flex min-h-screen ">
      <motion.div
        animate={{ width: isOpen ? "200px" : "60px" }}
        className=" bg-red-800 text-white transition-all duration-50 flex flex-col "
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
