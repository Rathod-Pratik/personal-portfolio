import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useAppStore } from "@store";
import { FaHome } from "react-icons/fa";

type NavbarProps = {
  isAdmin: boolean;
};

const Navbar = ({ isAdmin }: NavbarProps) => {
 const { userInfo } = useAppStore();
  if(isAdmin){
    return (<div className="backdrop-blur-lg border-b border-gray-200 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center mx-auto w-[90vw]">
        <Link to="/admin">
          <h2 className="text-2xl font-bold text-white">Portfolio</h2>
        </Link>

        {/* User Section */}
        <div className="relative flex gap-2 items-center">
          <p className="rounded-full text-white px-4 py-2 hidden md:block">
            Welcome,{" "}
            <span className="text-blue-500">
              {userInfo?.FirstName} {userInfo?.LastName}
            </span>
          </p>
          <Link
            to="/"
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition"
          >
            <FaHome className="text-white text-2xl" />
          </Link>
        </div>
      </div>
    </div>)
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/notes", label: "Notes" },
    { to: "/project", label: "Project" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
  ];

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    if (path === "/project") {
      return (
        location.pathname === "/project" ||
        location.pathname.startsWith("/projectDetails")
      );
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Toggle Navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  // Close menu on link click
  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Overlay (click outside to close) */}
      {isOpen && (
        <div
          onClick={toggleNavbar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      <nav
        className={`z-[50] bg-[hsl(222.2,84%,4.9%)]/50 border-b sticky top-0 backdrop-blur-lg p-4 ${isScrolled ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto flex justify-between items-center relative">
          {/* Logo */}
          <div className="text-2xl">
            <Link to="/">Portfolio</Link>
          </div>

          {/* Right Sidebar Menu */}
          <div
            className={`fixed md:static top-0 right-0 h-screen md:h-auto w-[260px] md:w-auto
  flex flex-col md:flex-row items-start md:items-center
  transition-transform duration-500 ease-in-out 
  bg-[#021027] md:bg-transparent text-white z-50
  px-6 py-6 md:p-0 md:translate-x-0
  ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
          >
            {/* ❌ Close Button */}
            <IoMdClose
              onClick={toggleNavbar}
              className="absolute top-5 right-5 text-3xl cursor-pointer md:hidden hover:text-red-400 transition"
            />

            {/* Menu */}
            <ul className="flex flex-col text-center md:flex-row align-middle md:gap-8 gap-6 mt-12 md:mt-0 w-full">
              {navItems.map((item) => (
                <li key={item.to} onClick={handleLinkClick}>
                  <Link
                    to={item.to}
                    className={`text-lg block transition-colors ${isActiveLink(item.to)
                      ? "text-orange-500 font-semibold"
                      : "hover:text-orange-500"
                      }`}
                    aria-current={isActiveLink(item.to) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Hire Me Button */}
            <a
              href="mailto:rathodpratik1928@gmail.com"
              className="mt-8 md:hidden w-full text-center bg-[#fca61f] text-white px-4 py-2 text-lg rounded-full hover:bg-[#6f34fe] transition-all duration-300"
            >
              Hire me
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:rathodpratik1928@gmail.com"
              className="hidden md:block bg-[#fca61f] text-white px-4 py-2 text-lg rounded-full hover:bg-[#6f34fe] transition-all duration-300"
            >
              Hire me
            </a>

            <IoMdMenu
              onClick={toggleNavbar}
              className="md:hidden text-3xl cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
