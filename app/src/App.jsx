import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

import ScrollToTop from "./Component/Scroll/scroll";
import Navbar from "./Component/Home/Navbar";
import Footer from "./Component/Footer/Footer";
import AdminNavbar from "./Component/Admin/Navbar";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Note from "./Pages/Note/Note";
import Project from "./Pages/Project/Project";
import ProjectDetalis from "./Pages/Project/ProjectDetalis";
import Login from "./Pages/Auth/Login";
import LoginOtp from "./Pages/Auth/LoginOtp";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import Blog from "./Pages/Blog/Blog";
import BlogDetail from "./Pages/Blog/BlogDetail";

import AdminLayout from "./Pages/Admin/AdminLayout";
import Admin from "./Pages/Admin/Admin";
import Projects from "./Pages/Admin/Projects";
import Notes from "./Pages/Admin/Notes";
import ContactUs from "./Pages/Admin/ContactUs";
import Resume from "./Pages/Admin/Resume";
import Languages from "./Pages/Admin/Language";
import Skill from "./Pages/Admin/Skills";
import Blogs from "./Pages/Admin/Blog";

import { useAppStore } from "./store";
import PrivateRoute from "./Routes/PrivateRoute";
import { apiClient } from "./lib/api-Client";
import { INCREMENT_VIEW_URL } from "./Utils/Constant";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { progress, setProgress } = useAppStore();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // animate only once when scrolling
    });
  }, []);

  useEffect(() => {
    const incrementView = async () => {
      try {
        if (!isAdmin && !sessionStorage.getItem("viewIncremented")) {
          await apiClient.put(INCREMENT_VIEW_URL);
          sessionStorage.setItem("viewIncremented", "true");
        }
      } catch (error) {
        console.error("Error incrementing view:", error);
      }
    };
    incrementView();
  }, [isAdmin]);

  useEffect(() => {
    if (previousPathRef.current === location.pathname) {
      return;
    }

    previousPathRef.current = location.pathname;
    setProgress(40);

    const finishTimer = setTimeout(() => {
      setProgress(100);
    }, 200);

    return () => {
      clearTimeout(finishTimer);
    };
  }, [location.pathname, setProgress]);

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      {isAdmin && <AdminNavbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Note />} />
          <Route path="/project" element={<Project />} />
          <Route path="/projectDetails/:_id" element={<ProjectDetalis />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:_id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-otp" element={<LoginOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/otp" element={<VerifyOtp />} />

          <Route path="/admin" element={<PrivateRoute element={AdminLayout} />}>
            <Route index element={<Admin />} />
            <Route path="language" element={<Languages />} />
            <Route path="project" element={<Projects />} />
            <Route path="notes" element={<Notes />} />
            <Route path="skills" element={<Skill />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="resume" element={<Resume />} />
            <Route path="contactUs" element={<ContactUs />} />
          </Route>
        </Routes>
      </main>

      <ToastContainer position="bottom-right" />
      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;
