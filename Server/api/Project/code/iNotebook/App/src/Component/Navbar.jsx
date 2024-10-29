import { Link, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { IoMdMenu } from "react-icons/io"
const Navbar = (props) => {
  const location = useLocation(); // Use useLocation to track the current path

  const handleLogout = () => {
    props.setProgress(10);
    localStorage.removeItem("token");
    props.setProgress(50);
    localStorage.removeItem("name");
    props.setProgress(100);
  }

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [btn, setbtn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };
    handleResize(); // Initialize the screen width
    window.addEventListener('resize', handleResize); // Add resize event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    setbtn(!btn);
    document.body.style.overflowX = isOpen ? 'auto' : 'hidden';
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'; // Check current path

  return (
    <>
      <nav className="bg-transparent w-full z-50 top-0 shadow-custom">
        <div className="flex justify-between items-center px-[30px] py-[13px]">
          <h1 className="text-4xl font-bold text-white">iNotebook</h1>

          {/* Navigation Links */}
          <div className={`gap-3 m-auto flex flex-col md:flex-row items-center absolute md:static left-0 w-full md:w-auto text-white transition-all duration-500 ease-in-out ${isOpen ? "!top-16 !max-h-screen py-[21px] shadow-custom bg-black" : "top-[-100vh]"}`}>
            <ul className="overflow-visible flex flex-col md:flex-row md:gap-8 gap-5 mt-5 md:mt-0 md:ml-8">
              <li className="nav-items">
                <Link className={`hover:border-b-2 hover:border-b-[#b6b4b4] ${location.pathname === '/' ? "text-[#b6b4b4]" : ""}`} to='/'>
                  Home
                </Link>
              </li>
              <li className="nav-items">
                <Link className={`hover:border-b-2 hover:border-b-[#b6b4b4] ${location.pathname === '/about' ? "text-[#b6b4b4]" : ""}`} to='/about'>
                  About
                </Link>
              </li>
            </ul>

            {/* Mobile View: Render buttons */}
            {isMobile && btn && !isAuthPage && (
              !localStorage.getItem('token') ? (
                <div className="flex gap-2">
                  <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</Link>
                  <Link to="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</Link>
                </div>
              ) : (
                <Link to="/login" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</Link>
              )
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            {!localStorage.getItem('token') ? (
              <div className="flex gap-2">
                <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</Link>
                <Link to="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</Link>
              </div>
            ) : (
              <Link to="/login" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</Link>
            )}
          </div>

          {/* Menu Icon for Mobile */}
          <IoMdMenu onClick={toggleNavbar} className="md:hidden text-3xl cursor-pointer text-white" />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
