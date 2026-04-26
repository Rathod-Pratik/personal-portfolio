import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

import { useAppStore } from "@store";
import PrivateRoute from "./Routes/PrivateRoute";
import { apiClient } from "@apiClient";
import { INCREMENT_VIEW_URL } from "@api";
import { ScrollToTop } from "@utils/Functions";
import { Footer, Layout, Navbar } from "@component";

import Home from "@pages/Home";
import About from "@pages/About";
import Note from "@pages/Note";
import Project from "@pages/Project";
import ProjectDetalis from "@pages/ProjectDetail";
import Blog from "@pages/Blog";
import BlogDetails from "@pages/BlogDetails";

// Auth
import Login from "@pages/Auth/Login";
import ForgotPassword from "@pages/Auth/ForgetPassword";
import OTP from "@pages/Auth/OTP";

// Admin
import Dashboard from "@pages/Admin/Dashboard";
import Projects from "@pages/Admin/Project";
import Notes from "@pages/Admin/Notes";
import CreateNote from "@pages/Admin/Notes/CreateNote";
import Skill from "@pages/Admin/Skills";
import Blogs from "@pages/Admin/Blog";
import Resume from "@pages/Admin/Resume";
import ContactUs from "@pages/Admin/ContactUS";
import CreateProject from "@pages/Admin/Project/CreateProject";
import CreateBlog from "@pages/Admin/Blog/CreateBlog";
import CreateSkill from "@pages/Admin/Skills/CreateSkill";
import AdminAbout from "@pages/Admin/About";


const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { progress, setProgress } = useAppStore();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
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
    <div className="min-h-screen max-w-full flex flex-col">
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ScrollToTop />
      <Navbar isAdmin={!isAdmin ? false : true} />

      <div className="h-[72px] flex-shrink-0" aria-hidden="true" />

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} /> {/*Done */}
          <Route path="/about" element={<About />} /> {/*Done */}
          <Route path="/notes" element={<Note />} /> {/*Done */}
          <Route path="/project" element={<Project />} /> {/*Done */}
          <Route path="/projectDetails/:_id" element={<ProjectDetalis />} /> {/*Done */}
          <Route path="/blog" element={<Blog />} /> {/*Done */}
          <Route path="/blog/:_id" element={<BlogDetails />} /> {/*Done */} 
          <Route path="/login" element={<Login />} /> {/*Done */} 
          <Route path="/login-otp" element={<OTP mode="login" />} /> {/*Done */} 
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/*Done */} 
          <Route path="/forgot-password/otp" element={<OTP mode="reset" />} /> {/*Done */} 

          <Route path="/admin" element={<PrivateRoute Element={Layout} />}>
            <Route index element={<Dashboard />} />
            <Route path="project" element={<Projects />} />
            <Route path="project/create" element={<CreateProject />} />
            <Route path="project/edit/:id" element={<CreateProject />} />
            <Route path="notes" element={<Notes />} />
            <Route path="notes/create" element={<CreateNote />} />
            <Route path="notes/edit/:id" element={<CreateNote />} />
            <Route path="skills" element={<Skill />} />
            <Route path="skills/create" element={<CreateSkill />} />
            <Route path="skills/edit/:id" element={<CreateSkill />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog/create" element={<CreateBlog />} />
            <Route path="blog/edit/:id" element={<CreateBlog />} />
            <Route path="resume" element={<Resume />} />
            <Route path="about" element={<AdminAbout />} />
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
