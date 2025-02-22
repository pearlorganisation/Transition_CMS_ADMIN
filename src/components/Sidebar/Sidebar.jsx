/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaBullseye } from "react-icons/fa";
import {
  MdPeople,
  MdWork,
  MdPublic,
  MdInsights,
  MdArticle,
  MdApartment,
  MdHandshake,
  MdPieChart,
  MdGroup,
  MdAddBox,
  MdLibraryBooks,
  MdMic,
} from "react-icons/md";

import { LuWallpaper } from "react-icons/lu";
import { useState } from "react";
import { motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/team",
    name: "Team",
    icon: <MdPeople />,
    subRoutes: [
      { path: "/team", name: "List Team", icon: <MdGroup /> },
      { path: "/team/add-team", name: "Add Team", icon: <MdAddBox /> },
      { path: "/teamDetails", name: "List Team Details", icon: <MdGroup /> },
      {
        path: "/teamDetails/add-teamDetails",
        name: "Add Team Details",
        icon: <MdAddBox />,
      },
    ],
  },
  {
    path: "/insights",
    name: "Insights",
    icon: <MdInsights />,
    subRoutes: [
      { path: "/press", name: "Press", icon: <MdLibraryBooks /> },
      { path: "/articles", name: "Articles", icon: <MdArticle /> },
      { path: "/podcast", name: "Podcast", icon: <MdMic /> },
    ],
  },
  {
    path: "/focusarea",
    name: "Focus Area",
    icon: <FaBullseye />,
    subRoutes: [
      {
        path: "/focusareafeature",
        name: "List Focus Area Features",
        icon: <MdInsights />,
      },
      {
        path: "/focusarea/add-focusareafeature",
        name: "Add Focus Area Feature",
        icon: <MdAddBox />,
      },
      { path: "/focusarea", name: "List Focus Areas", icon: <MdInsights /> },
      {
        path: "/focusarea/add-focusarea",
        name: "Add Focus Area",
        icon: <MdAddBox />,
      },
    ],
  },
  {
    path: "/portfolios",
    name: "Portfolios",
    icon: <MdWork />,
    subRoutes: [
      { path: "/portfolios", name: "List All Portfolios", icon: <MdWork /> },
      {
        path: "/portfolios/add-portfolio",
        name: "Add Portfolio",
        icon: <MdAddBox />,
      },
      {
        path: "/portfolios/portfolio-cards",
        name: "List All Portfolio Cards",
        icon: <MdWork />,
      },
      {
        path: "/portfolios/add-portfolio-card",
        name: "Add Portfolio Card",
        icon: <MdAddBox />,
      },
      {
        path: "/portfolios/invest-timeline-cards",
        name: "List All Investment Timeline Cards",
        icon: <MdWork />,
      },
      {
        path: "/portfolios/add-investment-timeline-card",
        name: "Add Investment Timeline Card",
        icon: <MdAddBox />,
      },
      {
        path: "/portfolios/invest-timelines",
        name: "List Investment Timelines",
        icon: <MdWork />,
      },
      {
        path: "/portfolios/add-investment-timeline",
        name: "Add Investment Timeline",
        icon: <MdAddBox />,
      },
      {
        path: "/portfolios/add-coinvestor",
        name: "List Co Investors",
        icon: <MdWork />,
      },
    ],
  },
  {
    path: "/impact",
    name: "Impact",
    icon: <MdPublic />,
    subRoutes: [
      { path: "/esg", name: "ESGs", icon: <MdHandshake /> },
      { path: "/mission", name: "Mission", icon: <MdPieChart /> },
      { path: "/sdg", name: "SDGs", icon: <MdApartment /> },
      { path: "/policies", name: "Policies", icon: <MdArticle /> },
    ],
  },
  {
    path: "/contactUs",
    name: "Contact Us",
    icon: <LuWallpaper />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.05 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.05 } },
  };

  return (
    <div className="flex min-h-screen">
      <motion.div
        animate={{ width: isOpen ? "250px" : "60px" }}
        className="bg-[#f4fdfc] text-black transition-all duration-50 flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3">
          {isOpen && <h1 className="text-xl font-bold">Sidebar</h1>}
          <button
            onClick={toggleSidebar}
            className="text-lg focus:outline-none hover:text-black/20"
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
                  className="flex items-center px-4 py-2 bg-[#f4fdfc] text-black font-medium hover:bg-black/20 "
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
