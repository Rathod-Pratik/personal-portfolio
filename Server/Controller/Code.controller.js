import { CodeModel } from "../Model/code.model.js";
import { deleteFile } from "./Notes.controller.js";

export const CreateCode = async (req, res) => {
  try {
    const { title, language, Details, description, output, fileUrl } =
      req.body;
    if (
      !title ||
      !language ||
      !Details ||
      !description ||
      !fileUrl ||
      !output
    ) {
      return res.status(400).send("All fields are required");
    }

    const code = await CodeModel.create({
      title,
      language,
      Details,
      description,
      output,
      Codefile_url: fileUrl,
    });
    if (code) {
      return res.status(200).json({ success: true, data: code });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const GetCode = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).send("_id is required");
    }

    const code = await CodeModel.find({ language: _id });

    return res.status(200).json({ success: true, data: code });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const Deletecode = async (req, res) => {
  try {
    const { _id } = req.params;

    if (_id) {
      return res.status(400).send("_id is required");
    }

    const Codefile=await CodeModel.findById(_id);

    try {
      await deleteFile(Codefile.output)
      await deleteFile(Codefile.Codefile_url)
    } catch (error) {
      console.error(error)
    }

    const code = await CodeModel.findByIdAndDelete(_id);

    if (code) {
      return res
        .status(200)
        .json({ success: true, message: "Code Deleted successfully" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const Updatecode = async (req, res) => {
  try {
    const { _id, title, language, Details, description, fileUrl, output } =
      req.body;
    if (!_id) {
      return res.status(400).send("_id is required");
    }

    const CodeData = await CodeModel.findById(_id);

    const UpdateData = {};
    if (title) UpdateData.title = title;
    if (language) UpdateData.language = language;
    if (Details) UpdateData.Details = Details;
    if (description) UpdateData.description = description;
    if (fileUrl !== null) {
      await deleteFile(CodeData.Codefile_url)
      UpdateData.Codefile_url = fileUrl;
    }
    if (output !== null) {
      await deleteFile(CodeData.output)
      UpdateData.output = output;
    }

    const Code = await CodeModel.findByIdAndUpdate(_id, UpdateData, {
      new: true,
    });

    if (Code) {
      return res.status(200).json({ success: true, data: Code });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
