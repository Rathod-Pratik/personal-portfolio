import dotenv from 'dotenv'
import jwt from "jsonwebtoken";


dotenv.config()
export const checkAdminCookie = (req, res, next) => {
    const adminCookie = req.cookies?.admin;
    if (!adminCookie) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin cookie is missing.",
      });
    }

    try {
      const verifiedAdmin = jwt.verify(adminCookie, process.env.JWT_SECRET);
  
      req.admin = verifiedAdmin;
  
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Invalid admin cookie. Authentication failed.",
      });
    }
  };