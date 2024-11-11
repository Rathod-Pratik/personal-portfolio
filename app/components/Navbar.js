import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import Aos from "aos";
import "aos/dist/aos.css";
import { ModeToggle } from "./Theme-btn";
import { useLoadingBar } from "@/components/LoadingBarContext";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme } = useTheme();
  const { setProgress } = useLoadingBar();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to toggle the navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflowX = isOpen ? "auto" : "hidden";
  };

  // Function to handle link click to show loading bar
  const handleLinkClick = () => {
    setProgress(40); // Start the loading bar at 40%
    setTimeout(() => setProgress(100), 500);
  };

  useEffect(() => {
    Aos.init();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-background/50 sticky top-0 backdrop-blur-lg p-4 border-b ${
        isScrolled ? "shadow-md" : ""
      } z-50`}
    >
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="text-2xl">
          <Link href="/">Rathod</Link>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-col md:flex-row items-center absolute md:static left-0 w-full md:w-auto transition-all duration-500 ease-in-out ${
            isOpen ? "!top-16 h-[310px] rounded" : "top-[-100vh]"
          } ${
            theme === "dark"
              ? "bg-[#021027] text-white md:bg-transparent"
              : "bg-white shadow-lg md:bg-transparent md:shadow-none"
          } ${
            isOpen ? "shadow-lg" : ""
          }`}
        >
          <ul className="flex flex-col md:flex-row md:gap-8 gap-5 mt-5 md:mt-0 md:ml-8">
            <li className="nav-items" onClick={toggleNavbar}>
              <Link
                href="/"
                className="link text-lg hover:text-orange-500 relative"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-items" onClick={toggleNavbar}>
              <Link
                href="/notes"
                className="link text-lg hover:text-orange-500 relative"
              >
                Notes
              </Link>
            </li>
            <li className="nav-items" onClick={toggleNavbar}>
              <Link
                href="/codes"
                className="link text-lg hover:text-orange-500 relative"
              >
                Codes
              </Link>
            </li>
            <li className="nav-items" onClick={toggleNavbar}>
              <Link
                href="/project"
                className="link text-lg hover:text-orange-500 relative"
              >
                Project
              </Link>
            </li>
            <li className="nav-items" onClick={toggleNavbar}>
              <Link
                href="/About"
                className="link text-lg hover:text-orange-500 relative"
                onClick={handleLinkClick}
              >
                About
              </Link>
            </li>
          </ul>
          <button className="mt-3 md:hidden bg-[#fca61f] text-white px-4 py-1 text-xl leading-7 rounded-full border-none hover:bg-[#6f34fe] transition-all duration-500">
            Hire me
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <button className="hidden md:block bg-[#fca61f] text-white px-4 py-1 text-xl leading-7 rounded-full border-none hover:bg-[#6f34fe] transition-all duration-500">
            Hire me
          </button>
          <IoMdMenu
            onClick={toggleNavbar}
            className="md:hidden text-3xl cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
