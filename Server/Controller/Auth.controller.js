import { AdminModel } from "../Model/Admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Login = async (req, res) => {  
    try {
      const { email, password } = req.body;
  
      // Validate email and password presence
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }
  
      email.toLowerCase();
      // Check if user exists
      const user = await AdminModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Account not found" }); // Generic message for security
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      // Create JWT token
      const tokenPayload = {
        id: user.id,
        role: user.role, // Include role in token
      };
  
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      // Common cookie options
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: "/", // Accessible across all routes
      };
  
      // Set cookie based on role
        res.cookie("adminToken", token, cookieOptions);
        return res.status(200).json({ userInfo:user, message: "Admin login successful" });
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