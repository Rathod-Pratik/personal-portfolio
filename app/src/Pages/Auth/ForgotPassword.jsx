import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { FORGOT_PASSWORD } from "../../Utils/Constant";
import Loading from "../../Component/Loading/Loading";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await apiClient.post(FORGOT_PASSWORD, {
        email: email.toLowerCase(),
      });

      if (response.status === 200) {
        sessionStorage.setItem("resetEmail", email.toLowerCase());
        toast.success("OTP sent to your email");
        navigate("/forgot-password/otp");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative shadow-xl rounded-2xl overflow-hidden w-full max-w-md sm:max-w-2xl lg:max-w-4xl bg-[#111827] border border-gray-800 p-6 sm:p-10 lg:p-12">
        {loading && <Loading />}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Forgot Password</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Enter your email address and we will send you a one-time password.
          </p>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-8 max-w-lg mx-auto">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 text-gray-200 bg-gray-900 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-transparent hover:bg-gray-800 transition duration-200"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;