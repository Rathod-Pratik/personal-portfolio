import { HeroModel } from './hero.model.ts';
import type { Request, Response } from 'express';
import type { UpdateHeroRequestBody } from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

export const getHero = async (_req: Request, res: Response) => {
  try {
    let hero = await HeroModel.findOne();
    if (!hero) {
      hero = new HeroModel(); 
      await hero.save();
    }
    return res.status(200).json(hero);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Update Hero Data
export const updateHero = async (
  req: Request<Record<string, never>, unknown, UpdateHeroRequestBody>,
  res: Response,
) => {
  try {
    const { greeting, name, roles, description, image } = req.body;

    let hero = await HeroModel.findOne();
    if (!hero) {
      hero = new HeroModel({ greeting, name, roles, description, image });
      await hero.save();
      return res
        .status(200)
        .json({ message: "Hero created successfully", hero });
    }

    hero.greeting = greeting !== undefined ? greeting : hero.greeting;
    hero.name = name !== undefined ? name : hero.name;
    hero.roles = roles !== undefined ? roles : hero.roles;
    hero.description =
      description !== undefined ? description : hero.description;
    hero.image = image !== undefined ? image : hero.image;

    await hero.save();
    return res.status(200).json({ message: "Hero updated successfully", hero });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};
