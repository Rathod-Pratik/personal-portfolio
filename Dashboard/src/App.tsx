import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import { useAppStore } from "@store";
import PrivateRoute from "./Routes/PrivateRoute";
import { Layout, Loading, Navbar } from "@component";
import { ADMIN_NAVBAR_HEIGHT } from "./Component/layout.constants";

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
const NotFound = lazy(() => import("@pages/NotFound"));

const PageLoader = () => <Loading />;

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);


  return (
    <div className="min-h-screen max-w-full flex flex-col">
      {isAdminRoute && (
        <>
          <Navbar />
          <div
            className="flex-shrink-0"
            aria-hidden="true"
            style={{ height: ADMIN_NAVBAR_HEIGHT }}
          />
        </>
      )}

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<PageLoader />}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="/otp"
            element={
              <Suspense fallback={<PageLoader />}>
                <OTP mode="login" />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password/otp"
            element={
              <Suspense fallback={<PageLoader />}>
                <OTP mode="reset" />
              </Suspense>
            }
          />
          <Route path="/admin" element={<PrivateRoute Element={Layout} />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="project"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="project/create"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateProject />
                </Suspense>
              }
            />
            <Route
              path="project/edit/:_id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateProject />
                </Suspense>
              }
            />
            <Route
              path="notes"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Notes />
                </Suspense>
              }
            />
            <Route
              path="notes/create"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateNote />
                </Suspense>
              }
            />
            <Route
              path="notes/edit/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateNote />
                </Suspense>
              }
            />
            <Route
              path="skills"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Skill />
                </Suspense>
              }
            />
            <Route
              path="skills/create"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateSkill />
                </Suspense>
              }
            />
            <Route
              path="skills/edit/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateSkill />
                </Suspense>
              }
            />
            <Route
              path="blog"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Blogs />
                </Suspense>
              }
            />
            <Route
              path="blog/create"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateBlog />
                </Suspense>
              }
            />
            <Route
              path="blog/edit/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CreateBlog />
                </Suspense>
              }
            />
            <Route
              path="resume"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Resume />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminAbout />
                </Suspense>
              }
            />
            <Route
              path="contactUs"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ContactUs />
                </Suspense>
              }
            />
            {/* Invalid admin routes */}
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>

          {/* Invalid public routes */}
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
