import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env") });

const createTransporter = () =>
  nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendOtpEmail = async ({ to, otp }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are not configured");
  }

  const transporter = createTransporter();

  return transporter.sendMail({
    from: `Portfolio Support <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your password reset OTP",
    text: `Your password reset OTP is ${otp}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>Your password reset OTP</h2>
        <p>Use the OTP below to verify your request:</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 6px; padding: 16px 20px; background: #f3f4f6; display: inline-block; border-radius: 10px;">${otp}</div>
        <p>This OTP expires in 10 minutes.</p>
      </div>
    `,
  });
};