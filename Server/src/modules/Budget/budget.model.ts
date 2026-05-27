import mongoose, { type HydratedDocument } from "mongoose";
import type { Document } from "mongoose";

export interface IBudget {
  value: string;
  isActive?: boolean;
  order?: number;
}

const BudgetSchema = new mongoose.Schema<IBudget>(
  {
    value: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type BudgetDocument = HydratedDocument<IBudget> & Document;

export const BudgetModel = mongoose.model<IBudget>("budget", BudgetSchema);
