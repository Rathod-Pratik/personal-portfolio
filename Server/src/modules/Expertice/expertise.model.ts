import mongoose, { type HydratedDocument } from "mongoose";
import type { IExpertice } from "@type";

const expertiseSchema = new mongoose.Schema<IExpertice>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      default: "#",
    },
  },
  {
    timestamps: true,
  },
);

export type ExperticeDocument = HydratedDocument<IExpertice>;

export const ExpertiseModel = mongoose.model<IExpertice>("expertise", expertiseSchema);
