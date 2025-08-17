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
    view: {
      type: Number,
      default: 0,
    },
    monthlyViews: {
      Jan: { type: Number, default: 0 },
      Feb: { type: Number, default: 0 },
      Mar: { type: Number, default: 0 },
      Apr: { type: Number, default: 0 },
      May: { type: Number, default: 0 },
      Jun: { type: Number, default: 0 },
      Jul: { type: Number, default: 0 },
      Aug: { type: Number, default: 0 },
      Sep: { type: Number, default: 0 },
      Oct: { type: Number, default: 0 },
      Nov: { type: Number, default: 0 },
      Dec: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const AdminModel = mongoose.model("user", AdminSchema);
