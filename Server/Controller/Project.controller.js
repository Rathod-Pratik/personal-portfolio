import { Project } from "../Model/project.model.js";

export const CreateProject = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      techStack,
      features,
      liveDemoLink,
      githubLink,
    } = req.body;
const {imageUrl,imageId}=req.uploadedFiles;
    if (
      !title ||
      !description ||
      !subtitle ||
      !techStack ||
      !liveDemoLink ||
      !features ||
      !githubLink ||
      !imageUrl ||
      !imageId
    ) {
      return res.status(400).send("All the details are required");
    }

    const project = await Project.create({
      title,
      subtitle,
      techStack,
      description,
      liveDemoLink,
      images:imageUrl,
      features,
      githubLink,
      imageId
    });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const DeleteProject = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(200).send("_id is required");
    }

    const project = await Project.findByIdAndDelete(_id);

    if (project) {
      return res
        .status(200)
        .send({ success: true, message: "Project Deleted successfully" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const GetProject = async (req, res) => {
  try {
    const project = await ProjectModel.find();

    if (project) {
      return res.status(200).json({ success: true, data: project });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const EditProject = async (req, res) => {
  try {
    const {
      _id,
      title,
      subtitle,
      githubLink,
      features,
      techStack,
      description
    } = req.body;
const {imageUrl,imageId} =req.uploadedFiles;
    if (!_id) {
      return res.status(400).send("_id is required");
    }
    const EditData = {};
    if (title) EditData.title = title;
    if (description) EditData.description = description;
    if (liveDemoLink) EditData.liveDemoLink = liveDemoLink;
    if (subtitle) EditData.subtitle = subtitle;
    if (techStack) EditData.techStack = techStack;
    if (features) EditData.features = features;
    if (githubLink) EditData.githubLink = githubLink;
    if (imageUrl) EditData.images = imageUrl;
    if (imageId) EditData.imageId = imageId;

    const project = await ProjectModel.findByIdAndUpdate(_id, EditData, {
      new: true,
    });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
