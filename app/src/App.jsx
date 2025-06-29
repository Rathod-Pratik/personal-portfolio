import  { useEffect } from "react";
import {  Navigate, Route, Routes, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Footer from "./Component/Footer/Footer";
import Note from "./Pages/Note/Note";
import Project from "./Pages/Project/Project";
import Code from "./Pages/Code/Code";
import LoadingBar from "react-top-loading-bar";
import ScrollToTop from "./Component/Scroll/scroll";
import Login from "./Pages/Auth/Login";
import { useAppStore } from "./store";

import AdminLayout from "./Pages/Admin/AdminLayout";
import Admin from "./Pages/Admin/Admin";
import Codes from "./Pages/Admin/Codes";
import Projects from "./Pages/Admin/Projects";
import Notes from "./Pages/Admin/Notes";
import ContactUs from "./Pages/Admin/ContactUs";
import Resume from "./Pages/Admin/Resume";
import AdminNavbar from "./Component/Admin/Navbar";
import Languages from "./Pages/Admin/Language";
import Skill from "./Pages/Admin/Skills";
import { ToastContainer } from "react-toastify";
import ProjectDetalis from "./Pages/Project/ProjectDetalis";
import Navbar from "./Component/Home/Navbar";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = userInfo; 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { progress, setProgress } = useAppStore();

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      {isAdmin && <AdminNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Note />} />
        <Route path="/login" element={<Login />} />
        <Route path="/codes" element={<Code />} />
        <Route path="/project" element={<Project />} />
        <Route path="/projectDetails/:_id" element={<ProjectDetalis />} />
        <Route path="/about" element={<About />} />

        <Route path="/admin" element={<PrivateRoute> <AdminLayout /> </PrivateRoute>}>
          <Route index element={<PrivateRoute><Admin /></PrivateRoute> } />
          <Route path="language" element={<PrivateRoute> <Languages /></PrivateRoute>} />
          <Route path="code" element={<PrivateRoute><Codes /></PrivateRoute>} />
          <Route path="project" element={<PrivateRoute><Projects /></PrivateRoute>} />
          <Route path="notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
          <Route path="skills" element={<PrivateRoute><Skill /></PrivateRoute>} />
          <Route path="resume" element={<PrivateRoute><Resume /></PrivateRoute>} />
          <Route path="contactUs" element={<PrivateRoute><ContactUs /></PrivateRoute>} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;
