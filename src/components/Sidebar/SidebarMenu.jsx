/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const menuAnimation = {
  hidden: { opacity: 0, height: 0, padding: 0, transition: { duration: 0.3 } },
  show: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

const SidebarMenu = ({ route, isOpen, showAnimation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (!isOpen) setIsMenuOpen(false);
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:bg-gray-700"
      >
        <div className="flex items-center">
          <div className="mr-3">{route.icon}</div>
          {isOpen && <span>{route.name}</span>}
        </div>
        {isOpen && (
          <motion.div
            animate={{ rotate: isMenuOpen ? -90 : 0 }}
            className="ml-2"
          >
            <FaAngleDown />
          </motion.div>
        )}
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="pl-8 space-y-1"
          >
            {route.subRoutes.map((subRoute, index) => (
              <NavLink
                to={subRoute.path}
                key={index}
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                <div className="mr-3">{subRoute.icon}</div>
                {isOpen && <span>{subRoute.name}</span>}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarMenu;
