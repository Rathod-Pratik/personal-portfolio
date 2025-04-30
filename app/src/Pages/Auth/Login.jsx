import React, { useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { LOGIN } from "../../Utils/Constant";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUserInfo } = useAppStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Login = async () => {
    try {
      const response = await apiClient.post(LOGIN,{email:formData.email.toLowerCase() ,password:formData.password},{
        withCredentials:true
      });
      if (response.status === 200) {
        setUserInfo(response.data.userInfo);
        navigate("/admin");
      }
    } catch (error) {
      toast.error("Some error occured");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className=" shadow-xl rounded-2xl overflow-hidden w-full max-w-6xl flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-1/2 hidden md:flex items-center justify-center p-12">
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
        <div className="lg:w-1/2 p-12 flex flex-col justify-center">
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
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-400"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-gray-500 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <button
              onClick={Login}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm
                    text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    transition duration-200"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
