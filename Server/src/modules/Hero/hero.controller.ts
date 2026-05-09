import { HeroModel } from './hero.model.ts';
import { Get_Signed_Url, deleteFile, uploadFileToS3 } from '@utils';
import type { Request, Response } from 'express';
import type { UpdateHeroRequestBody } from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const getUploadedFile = (req: Request) => {
  const files = req.files as
    | {
        file?: Express.Multer.File[];
        image?: Express.Multer.File[];
      }
    | undefined;

  return files?.image?.[0] ?? files?.file?.[0] ?? req.file ?? null;
};

export const getHero = async (_req: Request, res: Response) => {
  try {
    let hero = await HeroModel.findOne();
    if (!hero) {
      hero = new HeroModel(); 
      await hero.save();
    }

    const heroObj = hero.toObject ? hero.toObject() : hero;
    try {
      const img = heroObj.image;
      if (img && typeof img === 'string' && !img.startsWith('http')) {
        const signed = await Get_Signed_Url({ key: img });
        if (signed && signed.url) heroObj.image = signed.url;
      }
    } catch (err) {
      console.error('Failed to get signed url for hero image', err);
    }

    return res.status(200).json(heroObj);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Update Hero Data
export const updateHero = async (
  req: Request,
  res: Response,
) => {
  try {
    const { greeting, name, roles, description } = req.body;
    const file = getUploadedFile(req);
    const updateData: Record<string, any> = {};

    if (greeting !== undefined) updateData.greeting = greeting;
    if (name !== undefined) updateData.name = name;
    if (roles !== undefined) updateData.roles = roles;
    if (description !== undefined) updateData.description = description;

    // If a new image is provided, upload it and use the S3 key
    if (file) {
      const uploadedFile = await uploadFileToS3({
        buffer: file.buffer,
        fileName: file.originalname,
        fileType: file.mimetype,
        folderType: "Hero",
      });
      updateData.image = uploadedFile.key;

      // Delete old image if it exists and is a custom key (not default)
      let hero = await HeroModel.findOne();
      if (hero?.image && !hero.image.includes('personal-photo.jpg')) {
        try {
          await deleteFile(hero.image);
        } catch (error) {
          console.error("Error deleting old hero image:", error);
        }
      }
    }

    let hero = await HeroModel.findOne();
    if (!hero) {
      hero = new HeroModel(updateData);
      await hero.save();
      return res
        .status(200)
        .json({ message: "Hero created successfully", hero });
    }

    Object.assign(hero, updateData);
    await hero.save();
    return res.status(200).json({ message: "Hero updated successfully", hero });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};
