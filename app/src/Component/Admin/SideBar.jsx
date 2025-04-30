import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaHome, FaStar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCode, FaStickyNote } from "react-icons/fa";
import { IoLanguage, IoSettingsSharp, IoMailOutline } from "react-icons/io5";
import { GiSkills } from "react-icons/gi"; // Great for "Skills"
import { apiClient } from "../../lib/api-Client";
import { LOGOUT } from "../../Utils/Constant";
import { toast } from "react-toastify";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const location = useLocation();
  const navigate=useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => isMobile && setIsOpen(false);

  const navLinks = [
    { to: "/admin", icon: <FaHome />, label: "Dashboard" }, // Home icon = Dashboard
    { to: "/admin/language", icon: <IoLanguage />, label: "Language" }, // Language icon
    { to: "/admin/code", icon: <FaCode />, label: "Codes" }, // Code icon = better match
    { to: "/admin/project", icon: <IoSettingsSharp />, label: "Projects" }, // Gear/settings = projects/tools
    { to: "/admin/notes", icon: <FaStickyNote />, label: "Notes" }, // Sticky note = perfect
    { to: "/admin/skills", icon: <GiSkills />, label: "Skills" }, // Unique "skills" icon
    { to: "/admin/resume", icon: <FaStar />, label: "Resume" }, // Star for achievements
    { to: "/admin/contactUs", icon: <IoMailOutline />, label: "Contact Us" }, 
  ];

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest(".sidebar")) {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1280);
    if (window.innerWidth >= 1280) setIsOpen(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    // Initialize sidebar state based on screen size
    handleResize();
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const Logout = async () => {
    try {
      const response = await apiClient.get(LOGOUT, { withCredentials: true });
  
      if (response.status === 200) {
        toast.success("Logout successfully");
  
        // Clear any client-side auth data if stored
        localStorage.removeItem('auth-storage');
  
        // Navigate to login/home
        navigate('/');
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
      </div>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40 xl:hidden"
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
                  location.pathname === item.to
                    ? "bg-blue-500 text-white"
                    : "text-white hover:bg-blue-500"
                }`}
              aria-current={location.pathname === item.to ? "page" : undefined}
            >
              <span
                className={`text-xl text-white`}
              >
                {item.icon}
              </span>
              <span className="whitespace-nowrap font-medium">
                {item.label}
              </span>
            </Link>
          ))}
      <button onClick={Logout} className="bg-none border-none outline-none hover:bg-blue-500 text-white flex items-center gap-4 py-3 px-4 rounded-md transition-all duration-200">
        <FiLogOut size={20} /> Logout
      </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;