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

type OtpEmailPayload = {
  to: string;
  otp: string;
};

const buildOtpMailHtml = ({
  heading,
  subheading,
  otp,
  accentColor,
}: {
  heading: string;
  subheading: string;
  otp: string;
  accentColor: string;
}): string => {
  return `
    <div style="margin:0;padding:28px;background:#f4f7fb;font-family:'Segoe UI',Tahoma,Arial,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
        <tr>
          <td style="padding:24px 28px;background:linear-gradient(135deg, ${accentColor}, #0f172a);color:#ffffff;">
            <p style="margin:0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;opacity:0.9;">Portfolio Admin Security</p>
            <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;font-weight:700;">${heading}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:26px 28px 10px;">
            <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#334155;">${subheading}</p>
            <div style="margin:20px 0 16px;padding:18px 14px;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:12px;text-align:center;">
              <span style="display:inline-block;font-size:34px;letter-spacing:8px;font-weight:800;color:#0f172a;">${otp}</span>
            </div>
            <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">This OTP expires in <strong>10 minutes</strong>. Please do not share it with anyone.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 26px;">
            <div style="padding:12px 14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;color:#9a3412;font-size:13px;line-height:1.5;">
              Security tip: If you did not request this code, please ignore this email and update your password.
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
};

const sendOtpEmailBase = async ({
  to,
  otp,
  subject,
  heading,
  subheading,
  accentColor,
}: OtpEmailPayload & {
  subject: string;
  heading: string;
  subheading: string;
  accentColor: string;
}) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are not configured");
  }

  const transporter = createTransporter();

  return transporter.sendMail({
    from: `Portfolio Support <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: `${heading}\n\nOTP: ${otp}\nValid for 10 minutes.`,
    html: buildOtpMailHtml({ heading, subheading, otp, accentColor }),
  });
};

export const sendLoginOtpEmail = async (payload: OtpEmailPayload) => {
  return sendOtpEmailBase({
    ...payload,
    subject: "Your Login Verification OTP",
    heading: "Login Verification Code",
    subheading: "Use this one-time password to complete your admin login.",
    accentColor: "#0ea5e9",
  });
};

export const sendForgotPasswordOtpEmail = async (payload: OtpEmailPayload) => {
  return sendOtpEmailBase({
    ...payload,
    subject: "Your Password Reset OTP",
    heading: "Password Reset Code",
    subheading: "Use this one-time password to verify your password reset request.",
    accentColor: "#f97316",
  });
};