import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { Loading } from "@component";
import { LOGIN } from "@api";
import apiClient from "@apiClient";
import type { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const normalizedEmail = formData.email.toLowerCase();
      const response = await apiClient.post(
        LOGIN,
        { email: normalizedEmail, password: formData.password },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        sessionStorage.setItem("loginEmail", normalizedEmail);
        toast.success("OTP sent to your email");
        navigate("/login-otp", { state: { email: normalizedEmail } });
      }
    } catch (error) {
      const apiError = error as AxiosError<{ error?: string }>;
      toast.error(apiError.response?.data?.error || "Some error occured");
      console.log(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-2 sm:px-6 lg:px-8 py-8">
      <div className="relative shadow-xl rounded-2xl overflow-hidden w-full max-w-6xl flex flex-col lg:flex-row">
        {loading && <Loading />}
        {/* Image Section */}
        <div className="lg:w-1/2 hidden md:flex items-center justify-center p-6 sm:p-12">
          <div className="text-center text-white">
            <img
              src="/Login_image.png"
              alt="Welcome illustration"
              className="max-w-full h-auto mx-auto mb-8 rounded-lg shadow-lg"
            />
            <h3 className="text-2xl font-bold mb-2">Welcome Back!</h3>
            <p className="opacity-90">Sign in to access your account</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">Login now</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-gray-500 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 pr-12 text-gray-500 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm
                    text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
