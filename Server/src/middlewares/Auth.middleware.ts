import type { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import jwt, { type JwtPayload } from "jsonwebtoken";


dotenv.config()

type AdminRequest = Request & {
  admin?: string | JwtPayload;
};

export const checkAdminCookie = (req: AdminRequest, res: Response, next: NextFunction) => {
  const adminCookie = req.cookies?.admin;
  if (!adminCookie) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin cookie is missing.",
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      success: false,
      message: "Server JWT secret is not configured.",
    });
  }

  try {
    const verifiedAdmin = jwt.verify(adminCookie, jwtSecret);

    req.admin = verifiedAdmin;

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("JWT verification error:", errorMessage);
    return res.status(401).json({
      success: false,
      message: "Invalid admin cookie. Authentication failed.",
    });
  }
};