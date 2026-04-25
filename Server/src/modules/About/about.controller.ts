import type { Request, Response } from "express";
import { AboutModel } from './about.model.ts';

export const getAbout = async (req: Request, res: Response) => {
  try {
    let about = await AboutModel.findOne();
   
    return res.status(200).json(about);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    let about = await AboutModel.findOne();
    if (!about) {
      about = await AboutModel.create({ content });
    } else {
      about.content = content;
      await about.save();
    }
    return res
      .status(200)
      .json({ message: "About updated successfully", about });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
