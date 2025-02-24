// // import React, { useState } from "react";
// // import { FaUserCircle } from "react-icons/fa";
// // import { HiOutlineChevronDown } from "react-icons/hi";

// // const Header = () => {
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// //   const toggleDropdown = () => {
// //     setIsDropdownOpen(!isDropdownOpen);
// //   };

// //   return (
// //     <header className="bg-black text-white shadow-md">
// //       <div className="flex items-center justify-between px-6 py-3">
// //         {/* Logo Section */}
// //         <div className="flex items-center">
// //           <div className="text-2xl font-bold"> Transition Venture Capital</div>
// //         </div>

// //         {/* User Info Section */}
// //         <div className="relative">
// //           <button
// //             onClick={toggleDropdown}
// //             className="flex items-center space-x-2 text-sm font-medium hover:text-gray-300 focus:outline-none"
// //           >
// //             <FaUserCircle className="text-2xl" />
// //             <span> Shubham Mamgain </span>
// //             <HiOutlineChevronDown className="text-lg" />
// //           </button>

// //           {/* Dropdown */}
// //           {isDropdownOpen && (
// //             <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
// //               <button
// //                 onClick={() => {
// //                   setIsDropdownOpen(false);
// //                   alert("Profile Clicked");
// //                 }}
// //                 className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
// //               >
// //                 Profile
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setIsDropdownOpen(false);
// //                   alert("Logout Clicked");
// //                 }}
// //                 className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// // import { useState } from "react";
// // import { HiOutlineChevronDown } from "react-icons/hi";
// // import { IoPersonCircleOutline } from "react-icons/io5";

// // const Header = () => {
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// //   const toggleDropdown = () => {
// //     setIsDropdownOpen(!isDropdownOpen);
// //   };
// //   //   bg-gradient-to-r from-teal-500 to-blue-600
// //   return (
// //     <header className="bg-[#d9e0e5] text-white shadow-lg border-b-4 border-white">
// //       <div className="flex items-center justify-between px-6 py-4">
// //         {/* Logo Section */}
// //         <div className="text-2xl font-semibold tracking-wide">
// //           Transition Admin
// //         </div>

// //         {/* User Info Section */}
// //         <div className="relative">
// //           <button
// //             onClick={toggleDropdown}
// //             className="flex items-center space-x-2 text-base font-medium hover:text-gray-200 focus:outline-none"
// //           >
// //             <IoPersonCircleOutline className="text-3xl" />
// //             <span className="hidden sm:inline">Shubham Mamgain</span>
// //             <HiOutlineChevronDown className="text-lg" />
// //           </button>

// //           {/* Dropdown */}
// //           {isDropdownOpen && (
// //             <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200">
// //               <button
// //                 onClick={() => setIsDropdownOpen(false)}
// //                 className="block w-full text-left px-4 py-3 text-sm hover:bg-red-100 hover:text-red-600"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// import { useState } from "react";
// import { HiOutlineChevronDown } from "react-icons/hi";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { adminLogout } from "../../../features/actions/Auth/authAction";
// import { logout } from "../../../features/slices/Auth/authSlice";
// import { Link } from "react-router-dom";

// import Logo from "/logo.png";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dispatch = useDispatch();
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = async (e) => {
//     console.log("the button is clicked");
//     dispatch(adminLogout());
//     dispatch(logout());
//     setIsDropdownOpen(false);
//   };

//   const { profileData } = useSelector((state) => state.users);
//   const { profileInfo } = profileData;
//   return (
//     <header className="bg-[#f4fdfc] text-black shadow-md border-b-4 border-[#ADE9E4]">
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Logo Section */}
//         {/* <div className="text-2xl font-semibold tracking-wide">
//           Transition Admin
//         </div> */}

//         <img src={Logo} className="w-48 h-8" />

//         {/* User Info Section */}
//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="flex items-center space-x-2 text-base font-medium hover:text-[#BFF7F2] focus:outline-none"
//           >
//             <IoPersonCircleOutline className="text-3xl" />
//             <span className="hidden sm:inline">{profileInfo?.name}</span>
//             <HiOutlineChevronDown className="text-lg" />
//           </button>

//           {/* Dropdown */}
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-3 w-48 bg-[#F4FDFC] text-gray-800 rounded-lg shadow-lg border border-[#ADE9E4]">
//               <Link to={`/profile`}>
//                 <button
//                   onClick={() => setIsDropdownOpen(false)}
//                   className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#BFF7F2] hover:text-[#12BAAA] transition-colors"
//                 >
//                   Profile
//                 </button>
//               </Link>

//               <button
//                 onClick={(e) => handleLogout(e)}
//                 className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#BFF7F2] hover:text-[#12BAAA] transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState } from "react";
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

  return (
    <header className="bg-[#f4fdfc] text-black shadow-md border-b-4 border-[#ADE9E4]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <img src={Logo} className="w-48 h-8" alt="Logo" />

        {/* User Info Section */}
        <div className="relative">
          <button
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
            <div className="absolute right-0 mt-3 w-48 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300">
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
