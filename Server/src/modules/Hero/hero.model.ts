import mongoose, { type HydratedDocument } from "mongoose";
import type { IHero } from "@type";

const heroSchema = new mongoose.Schema<IHero>(
  {
    greeting: {
      type: String,
      default: "Hello! I Am",
    },
    name: {
      type: String,
      default: "Rathod Pratik",
    },
    roles: {
      type: [String],
      default: ["MERN Developer", "Web Developer"],
    },
    description: {
      type: String,
      default:
        "I'm A Web Developer having experience in creating websites with fully responsive design and handling backend development.",
    },
    image: {
      type: String,
      default:
        "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/personal-photo.jpg",
    },
  },
  {
    timestamps: true,
  },
);

export type HeroDocument = HydratedDocument<IHero>;

export const HeroModel = mongoose.model<IHero>("hero", heroSchema);
