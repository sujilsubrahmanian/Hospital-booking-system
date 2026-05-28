

import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userimg from "../assets/images/avatar-icon.png";
import { BiMenu } from "react-icons/bi";
//import "../app.css";
import { firestore } from "../firebase"; // Import Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(userimg); // Default avatar
  const userEmail = localStorage.getItem("email"); // Get logged-in user email

  // Sticky Header on Scroll
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const profile = () => navigate("/user/profile");

  // Fetch User Profile Image from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userEmail) {
        try {
          const q = query(collection(firestore, "patients"), where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setProfileImg(userData.photo || userimg); // Set profile image or default
          } else {
            console.log("User not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img src={logo} alt="Logo" height={50} />
          </div>

          {/* Navigation Links */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-primaryColor text-[16px] leading-7 font-[500] hover:text-textColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            {userEmail ? (
              <button 
              onClick={profile} 
              className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
              <figure className="w-[30px] h-[30px] rounded-full border-2 border-white overflow-hidden">
                  <img
                      src={profileImg}
                      alt="User Profile"
                      className="w-full h-full rounded-full"
                  />
              </figure>
              <span className="text-sm font-medium">View Profile</span>
          </button>
          
          
            ) : (
              <Link to={"/login"}>
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Book Appointment
                </button>
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
