import React, { useEffect, useState } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import Aos from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to toggle the navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflowX = isOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    Aos.init();
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`bg-white fixed w-full z-50 top-0 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="flex justify-between items-center px-[30px] py-[13px] " data-aos="fade-top">
        <h1 className="text-4xl font-bold text-gray-800">Coder</h1>

        {/* Navigation Links */}
        <div className={`flex flex-col md:flex-row items-center absolute md:static left-0 w-full md:w-auto bg-white transition-all duration-500 ease-in-out ${isOpen ? "!top-16 !max-h-screen" : "top-[-100vh]"}`}>
          <ul className="overflow-visible flex flex-col md:flex-row md:gap-8 gap-5 mt-5 md:mt-0 md:ml-8">
            <li className="nav-items">
              <Link to="/" className="text-lg text-black hover:text-orange-500 relative">
                Home
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/service" className="text-lg text-black hover:text-orange-500 relative">
                Service
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/about" className="text-lg text-black hover:text-orange-500 relative">
                About
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/project" className="text-lg text-black hover:text-orange-500 relative">
                Project
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/contact" className="text-lg text-black hover:text-orange-500 relative">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Button */}
        <div className="hidden md:block">
          <Button text="Contact" />
        </div>

        {/* Menu Icon */}
        <IoMdMenu onClick={toggleNavbar} className="md:hidden text-3xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
