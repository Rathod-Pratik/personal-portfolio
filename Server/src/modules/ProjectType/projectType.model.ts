import mongoose, { type HydratedDocument } from "mongoose";
import type { Document } from "mongoose";

export interface IProjectType {
  value: string;
  isActive?: boolean;
  order?: number;
}

const ProjectTypeSchema = new mongoose.Schema<IProjectType>(
  {
    value: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ProjectTypeDocument = HydratedDocument<IProjectType> & Document;

export const ProjectTypeModel = mongoose.model<IProjectType>("projectType", ProjectTypeSchema);
