// import React from "react";

// const Header = () => {
//   return <div>Header</div>;
// };

// export default Header;

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-black text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="text-2xl font-bold"> Transition CMS</div>
        </div>

        {/* User Info Section */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-sm font-medium hover:text-gray-300 focus:outline-none"
          >
            <FaUserCircle className="text-2xl" />
            <span> Shubham Mamgain </span>
            <HiOutlineChevronDown className="text-lg" />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  alert("Profile Clicked");
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  alert("Logout Clicked");
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
