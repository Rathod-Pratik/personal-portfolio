import { CodeModel } from "../Model/code.model.js";

export const CreateCode = async (req, res) => {
  try {
    const { title, language, Details, description } = req.body;

    const { fileUrl, fileId, imageUrl, imageId } = req.uploadedFiles;
    if (
      !title ||
      !language ||
      !Details ||
      !description ||
      !fileUrl ||
      !imageUrl
    ) {
      return res.status(400).send("All fields are required");
    }

    const code = await CodeModel.create({
      fileId,
      title,
      imageId,
      language,
      Details,
      description,
      output: imageUrl,
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
    const code = await CodeModel.find();

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
    const { _id, title, language, Details, description } = req.body;
    const { fileUrl, fileId, imageUrl, imageId } = req.uploadedFiles;
    if (!_id) {
      return res.status(400).send("_id is required");
    }
    const UpdateData = {};
    if (title) UpdateData.title = title;
    if (language) UpdateData.language = language;
    if (Details) UpdateData.Details = Details;
    if (description) UpdateData.description = description;
    if (fileUrl) UpdateData.Codefile_url = fileUrl;
    if (imageUrl) UpdateData.output = imageUrl;
    if (fileId) UpdateData.fileId = fileId;
    if (imageId) UpdateData.imageId = imageId;

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
