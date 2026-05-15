import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useAppStore } from "@store";

const Navbar = () => {
  const { userInfo } = useAppStore();


  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const closeNavbarOnMobile = () => {
    if (isMobile) setIsOpen(false);
  };




  useEffect(() => {
    closeNavbarOnMobile();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? "hidden" : "auto";
  }, [isOpen, isMobile]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleAdminSidebarFromNavbar = () => {
    window.dispatchEvent(new CustomEvent("admin-sidebar-toggle"));
  };



  return (
   <nav   className={`h-[72px] fixed top-0 left-0 right-0 w-full z-[50]  bg-[hsl(222.2,84%,4.9%)]/50 border-b backdrop-blur-lg items-center px-4 ${isScrolled ? "shadow-md" : ""
          }`}>
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
    </nav>
  );
};

export default Navbar;
