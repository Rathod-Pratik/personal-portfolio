import { useEffect, useRef, lazy, Suspense } from "react";
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
import { Footer, Layout, Loading, Navbar } from "@component";

const Login = lazy(() => import("@pages/Auth/Login"));
const ForgotPassword = lazy(() => import("@pages/Auth/ForgetPassword"));
const OTP = lazy(() => import("@pages/Auth/OTP"));

// Admin Pages
const Dashboard = lazy(() => import("@pages/Dashboard"));
const Projects = lazy(() => import("@pages/Project"));
const Notes = lazy(() => import("@pages/Notes"));
const CreateNote = lazy(() => import("@pages/Notes/CreateNote"));
const Skill = lazy(() => import("@pages/Skills"));
const Blogs = lazy(() => import("@pages/Blog"));
const Resume = lazy(() => import("@pages/Resume"));
const ContactUs = lazy(() => import("@pages/ContactUS"));
const CreateProject = lazy(() => import("@pages/Project/CreateProject"));
const CreateBlog = lazy(() => import("@pages/Blog/CreateBlog"));
const CreateSkill = lazy(() => import("@pages/Skills/CreateSkill"));
const AdminAbout = lazy(() => import("@pages/About"));

const PageLoader = () => (
  <Loading />
);


const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isAuth = ["/", "/login", "/otp"].includes(location.pathname) || location.pathname.startsWith("/forgot-password");
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
      {!isAuth && <>
        <Navbar />
        <div className="h-[72px] flex-shrink-0" aria-hidden="true" />
      </>}

      <main className="flex-1">
        <Routes >
          <Route path="/" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
          <Route path="/forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense>} />
          <Route path="/otp" element={<Suspense fallback={<PageLoader />}><OTP mode="login" /></Suspense>} />
          <Route path="/forgot-password/otp" element={<Suspense fallback={<PageLoader />}><OTP mode="reset" /></Suspense>} />
          <Route path="/admin" element={<PrivateRoute Element={Layout} />}>
            <Route index element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
            <Route path="project" element={<Suspense fallback={<PageLoader />}><Projects /></Suspense>} />
            <Route path="project/create" element={<Suspense fallback={<PageLoader />}><CreateProject /></Suspense>} />
            <Route path="project/edit/:_id" element={<Suspense fallback={<PageLoader />}><CreateProject /></Suspense>} />
            <Route path="notes" element={<Suspense fallback={<PageLoader />}><Notes /></Suspense>} />
            <Route path="notes/create" element={<Suspense fallback={<PageLoader />}><CreateNote /></Suspense>} />
            <Route path="notes/edit/:id" element={<Suspense fallback={<PageLoader />}><CreateNote /></Suspense>} />
            <Route path="skills" element={<Suspense fallback={<PageLoader />}><Skill /></Suspense>} />
            <Route path="skills/create" element={<Suspense fallback={<PageLoader />}><CreateSkill /></Suspense>} />
            <Route path="skills/edit/:id" element={<Suspense fallback={<PageLoader />}><CreateSkill /></Suspense>} />
            <Route path="blog" element={<Suspense fallback={<PageLoader />}><Blogs /></Suspense>} />
            <Route path="blog/create" element={<Suspense fallback={<PageLoader />}><CreateBlog /></Suspense>} />
            <Route path="blog/edit/:id" element={<Suspense fallback={<PageLoader />}><CreateBlog /></Suspense>} />
            <Route path="resume" element={<Suspense fallback={<PageLoader />}><Resume /></Suspense>} />
            <Route path="about" element={<Suspense fallback={<PageLoader />}><AdminAbout /></Suspense>} />
            <Route path="contactUs" element={<Suspense fallback={<PageLoader />}><ContactUs /></Suspense>} />
          </Route>
        </Routes>
      </main>

      <ToastContainer position="bottom-right" />
      {!isAdmin && !isAuth && <Footer />}
    </div>
  );
};

export default App;
