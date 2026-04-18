import { HeroModel } from "../Model/hero.model.js";

// Get Hero Data (returns the first one, or creates a default if none exists)
export const getHero = async (req, res) => {
  try {
    let hero = await HeroModel.findOne();
    if (!hero) {
      hero = new HeroModel(); // Creates with defaults defined in schema
      await hero.save();
    }
    return res.status(200).json(hero);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update Hero Data
export const updateHero = async (req, res) => {
  try {
    const { greeting, name, roles, description, image } = req.body;

    let hero = await HeroModel.findOne();
    if (!hero) {
      // Should not happen normally if get was called before, but just in case
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
      .json({ message: "Internal server error", error: error.message });
  }
};
