import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { LOGIN_VERIFY_OTP } from "../../Utils/Constant";
import { useAppStore } from "../../store";
import Loading from "../../Component/Loading/Loading";

const LoginOtp = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState(sessionStorage.getItem("loginEmail") || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await apiClient.post(
        LOGIN_VERIFY_OTP,
        { email, otp },
        { withCredentials: true },
      );

      if (response.status === 200) {
        sessionStorage.removeItem("loginEmail");
        setUserInfo(response.data.userInfo);
        toast.success("Login successful");
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative shadow-xl rounded-2xl overflow-hidden w-full max-w-md sm:max-w-2xl lg:max-w-4xl bg-[#111827] border border-gray-800 p-6 sm:p-10 lg:p-12">
        {loading && <Loading />}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Login OTP</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400 break-all">
            Enter the OTP sent to <span className="text-blue-400">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerifyLoginOtp} className="space-y-8 max-w-lg mx-auto">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full px-5 py-3 text-gray-200 bg-gray-900 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 tracking-[0.2em] sm:tracking-[0.35em] text-center"
              placeholder="123456"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? "Verifying..." : "Verify & Login"}
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

export default LoginOtp;