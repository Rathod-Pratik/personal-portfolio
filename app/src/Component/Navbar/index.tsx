import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useAppStore } from "@store";

type NavbarProps = {
  isAdmin: boolean;
};

const Navbar = ({ isAdmin }: NavbarProps) => {
 const { userInfo } = useAppStore();


  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const closeNavbarOnMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

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
    setIsOpen((prev) => !prev);
  };

  // Close menu on link click
  const handleLinkClick = () => {
    closeNavbarOnMobile();
  };

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    closeNavbarOnMobile();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? "hidden" : "auto";
  }, [isOpen, isMobile]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleAdminSidebarFromNavbar = () => {
    if (window.innerWidth < 1280) {
      window.dispatchEvent(new CustomEvent("admin-sidebar-toggle"));
    }
  };

  if(isAdmin){
    return (<nav className="fixed top-0 left-0 right-0 z-[60] h-[72px] backdrop-blur-lg border-b border-gray-200 bg-[hsl(222.2,84%,4.9%)]/70 w-full">
      <div className="flex h-full justify-between items-center px-4 md:px-6">
        <Link to="/admin">
          <h2 className="text-2xl font-bold text-white">Portfolio</h2>
        </Link>

        {/* User Section */}
        <div className="relative flex items-center gap-3">
          <p className="text-white hidden sm:block text-sm sm:text-base whitespace-nowrap">
            <span className="text-blue-500">
         Welcome     {userInfo?.FirstName} {userInfo?.LastName}
            </span>
          </p>
          <button
            type="button"
            onClick={toggleAdminSidebarFromNavbar}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition xl:hidden"
            aria-label="Open admin sidebar"
          >
            <IoMdMenu className="text-white text-2xl" />
          </button>
        </div>
      </div>
    </nav>)
  }

  return (
    <>
      {/* Overlay (click outside to close) */}
      {isOpen && (
        <div
          onClick={closeNavbar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 w-full z-[50] bg-[hsl(222.2,84%,4.9%)]/50 border-b backdrop-blur-lg p-4 ${isScrolled ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto flex justify-between items-center relative">
          {/* Logo */}
          <div className="text-2xl">
            <Link to="/" onClick={handleLinkClick}>Portfolio</Link>
          </div>

          {/* Right Sidebar Menu */}
          <div
            className={`fixed md:static top-0 right-0 h-[100dvh] md:h-auto w-[78vw] max-w-[320px] md:max-w-full md:w-auto
  flex flex-col md:flex-row items-start md:items-center
  transform-gpu transition-all duration-500 ease-in-out 
  overflow-y-auto bg-[#021027] md:bg-transparent text-white z-50
  px-6 py-6 md:p-0 md:translate-x-0
  ${
    isOpen
      ? "translate-x-0 opacity-100 visible pointer-events-auto"
      : "translate-x-full opacity-0 invisible pointer-events-none md:translate-x-0 md:opacity-100 md:visible md:pointer-events-auto"
  }`}
          >
            {/* ❌ Close Button */}
            <IoMdClose
              onClick={closeNavbar}
              className="absolute top-5 right-5 text-3xl cursor-pointer md:hidden hover:text-red-400 transition"
            />

            {/* Menu */}
            <ul className="flex flex-col text-center md:flex-row align-middle md:gap-8 gap-6 mt-12 md:mt-0 w-full">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={handleLinkClick}
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
