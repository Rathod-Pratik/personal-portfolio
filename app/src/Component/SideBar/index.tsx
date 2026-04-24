import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaHome, FaStar, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaStickyNote } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";

import { IoSettingsSharp, IoMailOutline } from "react-icons/io5";
import { GiSkills } from "react-icons/gi"; // Great for "Skills"
import { apiClient } from "../../lib/api-Client";
import { LOGOUT } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { useAppStore } from "../../store";

function Sidebar() {
  const { userInfo } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => isMobile && setIsOpen(false);

  const navLinks = [
    { to: "/admin", icon: <FaHome />, label: "Dashboard" },
    { to: "/admin/project", icon: <IoSettingsSharp />, label: "Projects" },
    { to: "/admin/notes", icon: <FaStickyNote />, label: "Notes" },
    { to: "/admin/skills", icon: <GiSkills />, label: "Skills" },
    { to: "/admin/resume", icon: <FaStar />, label: "Resume" },
    { to: "/admin/about", icon: <FaUser />, label: "About" },
    { to: "/admin/blog", icon: <MdOutlineArticle />, label: "Blog" },
    { to: "/admin/contactUs", icon: <IoMailOutline />, label: "Contact Us" },
  ];

  const isActiveLink = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest(".sidebar")) {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    const mobile = window.innerWidth < 1280;
    setIsMobile(mobile);
    setIsOpen(!mobile);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const Logout = async () => {
    try {
      const response = await apiClient.get(LOGOUT, { withCredentials: true });

      if (response.status === 200) {
        toast.success("Logout successfully");

        // Clear any client-side auth data if stored
        localStorage.removeItem("auth-storage");

        // Navigate to login/home
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="flex items-center justify-between px-4 pt-4 pb-6 w-full xl:hidden ">
        <button
          onClick={toggleSidebar}
          className="text-blue-600 text-2xl focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <p className="rounded-full text-white px-4 py-2 md:hidden">
          Welcome,{" "}
          <span className="text-blue-500">
            {userInfo?.FirstName} {userInfo?.LastName}
          </span>
        </p>
      </div>

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar bg-[#020817]  fixed top-[71px] left-0 h-[calc(100vh-71px)] z-50 shadow-lg border-r transition-all  duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          xl:translate-x-0 w-[250px]`}
        aria-label="Sidebar navigation"
      >
        <nav className="flex flex-col px-4 pt-6 pb-4 space-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={`flex items-center gap-4 py-3 px-4 rounded-md transition-all duration-200 
                ${
                  isActiveLink(item.to)
                    ? "bg-blue-500 text-white"
                    : "text-white hover:bg-blue-500"
                }`}
              aria-current={isActiveLink(item.to) ? "page" : undefined}
            >
              <span className={`text-xl text-white`}>{item.icon}</span>
              <span className="whitespace-nowrap font-medium">
                {item.label}
              </span>
            </Link>
          ))}
          <button
            onClick={Logout}
            className="bg-none border-none outline-none hover:bg-blue-500 text-white flex items-center gap-4 py-3 px-4 rounded-md transition-all duration-200"
          >
            <FiLogOut size={20} /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
