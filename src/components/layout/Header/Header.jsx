import { useState, useEffect, useRef } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../../features/actions/Auth/authAction";
import { logout } from "../../../features/slices/Auth/authSlice";
import { Link } from "react-router-dom";

import Logo from "/logo.png";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const dropdownRef = useRef(null); // Reference for the dropdown
  const buttonRef = useRef(null); // Reference for the button

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    dispatch(adminLogout());
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  const { profileData } = useSelector((state) => state.users);
  const { profileInfo } = profileData;

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#f4fdfc] text-black shadow-md border-b-4 border-[#ADE9E4]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <img src={Logo} className="w-48 h-8" alt="Logo" />

        {/* User Info Section */}
        <div className="relative">
          <button
            ref={buttonRef} // Set ref to the button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-base font-medium hover:text-[#12BAAA] focus:outline-none"
          >
            <IoPersonCircleOutline className="text-3xl" />
            <span className="hidden sm:inline">
              {profileInfo?.name || "User"}
            </span>
            <HiOutlineChevronDown className="text-lg" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef} // Set ref to the dropdown menu
              className="absolute right-0 mt-3 w-48 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300"
            >
              <Link to="/profile">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="block w-full text-left px-5 py-3 text-md font-medium hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  Profile
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-5 py-3 text-md font-medium text-red-600 hover:bg-red-100 hover:text-red-700 transition-all"
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
