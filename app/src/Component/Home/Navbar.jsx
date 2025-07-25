import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useAppStore } from "../../store";

const Navbar = () => {

  const {setProgress}=useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to toggle the navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflowX = isOpen ? "auto" : "hidden";
  };

  // Function to handle link click to show loading bar
  const handleLinkClick = () => {
    setProgress(40); 
    setTimeout(() => {
      setProgress(100);
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`z-[50] bg-[hsl(222.2,84%,4.9%)]/50 border-b sticky top-0 backdrop-blur-lg p-4 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="text-2xl">
          <Link to="/">Rathod</Link>
        </div>

        {/* Navigation Links */}
        <div className={`flex flex-col md:flex-row items-center absolute md:static left-0 w-full md:w-auto transition-all duration-500 ease-in-out bg-[#021027] text-white md:bg-transparent ${isOpen ? "!top-16 h-[310px] rounded shadow-lg" : "top-[-100vh]"}`}>
        <ul className="flex flex-col md:flex-row md:gap-8 gap-5 mt-5 md:mt-0 md:ml-8">
            <li className="nav-items" onClick={()=>setIsOpen(false)}>
              <Link
                to="/"
                className="link text-lg hover:text-orange-500 relative"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-items" onClick={()=>setIsOpen(false)}>
              <Link
              onClick={handleLinkClick}
                to="/notes"
                className="link text-lg hover:text-orange-500 relative"
              >
                Notes
              </Link>
            </li>
            <li className="nav-items" onClick={()=>setIsOpen(false)}>
              <Link
              onClick={handleLinkClick}
                to="/codes"
                className="link text-lg hover:text-orange-500 relative"
              >
                Codes
              </Link>
            </li>
            <li className="nav-items" onClick={()=>setIsOpen(false)}>
              <Link
              onClick={handleLinkClick}
                to="/project"
                className="link text-lg hover:text-orange-500 relative"
              >
                Project
              </Link>
            </li>
            <li className="nav-items" onClick={()=>setIsOpen(false)}>
              <Link
              onClick={handleLinkClick}
                to="/About"
                className="link text-lg hover:text-orange-500 relative"
              >
                About
              </Link>
            </li>
          </ul>
          <a to="mailto:rathodpratik1928@gmail.com" className="mt-3 md:hidden bg-[#fca61f] text-white px-4 py-1 text-xl leading-7 rounded-full border-none hover:bg-[#6f34fe] transition-all duration-500">
            Hire me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <a to="mailto:rathodpratik1928@gmail.com" className="hidden md:block bg-[#fca61f] text-white px-4 py-1 text-xl leading-7 rounded-full border-none hover:bg-[#6f34fe] transition-all duration-500">
            Hire me
          </a>
          <IoMdMenu onClick={toggleNavbar} className="md:hidden text-3xl cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
