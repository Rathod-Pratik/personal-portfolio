import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginOtpHash: {
      type: String,
      default: null,
    },
    loginOtpExpiresAt: {
      type: Date,
      default: null,
    },
    resetOtpHash: {
      type: String,
      default: null,
    },
    resetOtpExpiresAt: {
      type: Date,
      default: null,
    },
    resetOtpVerified: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const AdminModel = mongoose.model("user", AdminSchema);
