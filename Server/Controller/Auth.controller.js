import { AdminModel } from "../Model/Admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const tokenPayload = { id: user.id, role: user.role };
    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1d" });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true only if using HTTPS
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
    console.error("Error during login:", error.message);
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
