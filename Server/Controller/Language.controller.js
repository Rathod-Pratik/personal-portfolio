import { languageModel } from "../Model/Language.model.js";

export const CreateLanguage = async (req, res) => {
  try {
    const { language, description } = req.body;
    if (!language || !description) {
      return res.status(400).send("All the fields are required");
    }

    const languages = await languageModel.create({ language, description });
    if (language) {
      return res.status(200).json({ success: true, data: languages });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const EditLanguage = async (req, res) => {
  try {
    const { _id, language, description } = req.body;
    if (!_id) {
      return res.status(400).send("_id is required");
    }

    const Editlang = {};
    if (language) Editlang.language = language;
    if (description) Editlang.description = description;

    const languages = await languageModel.findByIdAndUpdate(_id, Editlang, {
      new: true,
    });

    if (language) {
      return res.status(200).json({ success: true, data: languages });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const DeleteLanguage = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).send("_id is required");
    }

    const languages = await languageModel.findByIdAndDelete(_id);

    if (languages) {
      return res
        .status(200)
        .json({ success: true, message: "Language deleted successfully" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const GetLanguage = async (req, res) => {
  try {
    const languages = await languageModel.find();

    if (languages) {
      return res.status(200).json({ success: true, data: languages });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
