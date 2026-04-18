import { AdminModel } from "../Model/Admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomInt } from "node:crypto";
import { sendOtpEmail } from "../Utils/mailer.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await AdminModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ error: "Account not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Please enter valid Password" });
    }

    const otp = String(randomInt(100000, 1000000));
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.loginOtpHash = otpHash;
    user.loginOtpExpiresAt = otpExpiresAt;
    await user.save();

    await sendOtpEmail({ to: normalizedEmail, otp });

    return res.status(200).json({
      message: "OTP sent successfully",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await AdminModel.findOne({ email: normalizedEmail });

    if (!user || !user.loginOtpHash || !user.loginOtpExpiresAt) {
      return res.status(400).json({ error: "OTP not requested" });
    }

    if (user.loginOtpExpiresAt.getTime() < Date.now()) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    const isMatch = await bcrypt.compare(String(otp), user.loginOtpHash);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.loginOtpHash = null;
    user.loginOtpExpiresAt = null;
    await user.save();

    const tokenPayload = { id: user.id, role: user.role };
    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1d" });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    };

    res.cookie("admin", token, cookieOptions);

    return res.status(200).json({
      userInfo: user,
      message: "Admin login successful",
    });
  } catch (error) {
    console.error("Login OTP verification error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    //Check if email and password are provided
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    //Check if user already exists
    const existUser = await AdminModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const solt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, solt);
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");
    const user = await AdminModel.create({
      FirstName: firstName,
      LastName: lastName,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    return res.status(201).send({ user });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const Logout = async (req, res) => {
  try {
    console.log("Cookies:", req.cookies);
    res.clearCookie("admin", {
      httpOnly: true,
      secure: true, 
      sameSite: "None", 
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Logout failed" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await AdminModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ error: "Account not found" });
    }

    const otp = String(randomInt(100000, 1000000));
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtpHash = otpHash;
    user.resetOtpExpiresAt = otpExpiresAt;
    user.resetOtpVerified = false;
    await user.save();

    await sendOtpEmail({ to: normalizedEmail, otp });

    return res.status(200).json({
      message: "OTP sent successfully",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await AdminModel.findOne({ email: normalizedEmail });

    if (!user || !user.resetOtpHash || !user.resetOtpExpiresAt) {
      return res.status(400).json({ error: "OTP not requested" });
    }

    if (user.resetOtpExpiresAt.getTime() < Date.now()) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    const isMatch = await bcrypt.compare(String(otp), user.resetOtpHash);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.resetOtpVerified = true;
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("OTP verification error:", error.message);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await AdminModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (!user.resetOtpVerified) {
      return res.status(400).json({ error: "OTP verification is required" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetOtpHash = null;
    user.resetOtpExpiresAt = null;
    user.resetOtpVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res.status(500).json({ error: "Failed to reset password" });
  }
};
