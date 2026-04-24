import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "../../../lib/api-Client";
import {
    LOGIN_VERIFY_OTP,
    RESET_PASSWORD,
    VERIFY_OTP,
} from "../../../Utils/Constant";
import { useAppStore } from "../../../store";
import { Loading } from "@component";

type OtpMode = "login" | "reset";

type OtpFlowProps = {
    mode: OtpMode;
};

const OtpFlow = ({ mode }: OtpFlowProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const routeEmail = (location.state as { email?: string } | null)?.email || "";
    const { setUserInfo } = useAppStore() as {
        setUserInfo: (userInfo: unknown) => void;
    };

    const [email] = useState(
        mode === "login"
            ? routeEmail || sessionStorage.getItem("loginEmail") || ""
            : routeEmail || sessionStorage.getItem("resetEmail") || "",
    );
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpVerified, setOtpVerified] = useState(mode === "login");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate(mode === "login" ? "/login" : "/forgot-password");
        }
    }, [email, mode, navigate]);

    const verifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);

            if (mode === "login") {
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
                return;
            }

            const response = await apiClient.post(VERIFY_OTP, {
                email,
                otp,
            });

            if (response.status === 200) {
                setOtpVerified(true);
                toast.success("OTP verified successfully");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await apiClient.post(RESET_PASSWORD, {
                email,
                password: newPassword,
            });

            if (response.status === 200) {
                sessionStorage.removeItem("resetEmail");
                toast.success("Password reset successfully");
                navigate("/login");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    const title = mode === "login" ? "Login OTP" : "Verify OTP";
    const subtitle =
        mode === "login"
            ? "Enter the OTP sent to"
            : "We sent a code to";

    return (
        <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative shadow-xl rounded-2xl overflow-hidden w-full max-w-md sm:max-w-2xl lg:max-w-4xl bg-[#111827] border border-gray-800 p-6 sm:p-10 lg:p-12">
                {loading && <Loading />}
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{title}</h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-400 break-all">
                        {subtitle} <span className="text-blue-400">{email}</span>
                    </p>
                </div>

                <div className="space-y-8 max-w-lg mx-auto">
                    {(mode === "login" || !otpVerified) && (
                        <form onSubmit={verifyOtp} className="space-y-6">
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
                                    onChange={(event) => setOtp(event.target.value)}
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
                                    {loading
                                        ? "Verifying..."
                                        : mode === "login"
                                            ? "Verify & Login"
                                            : "Verify OTP"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate(mode === "login" ? "/login" : "/forgot-password")}
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-transparent hover:bg-gray-800 transition duration-200"
                                >
                                    {mode === "login" ? "Back to Login" : "Change Email"}
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === "reset" && otpVerified && (
                        <form onSubmit={resetPassword} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="newPassword"
                                    className="block text-sm font-medium text-gray-400 mb-1"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                        required
                                        className="w-full px-5 py-3 pr-12 text-gray-200 bg-gray-900 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword((value) => !value)}
                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-200 transition-colors"
                                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-400 mb-1"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        required
                                        className="w-full px-5 py-3 pr-12 text-gray-200 bg-gray-900 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((value) => !value)}
                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-200 transition-colors"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpFlow;
