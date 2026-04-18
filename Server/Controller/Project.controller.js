import { Project } from "../Model/project.model.js";
import { deleteFile } from "./Notes.controller.js";

const checkMissingFields = (requiredFields, body) => {
  const missing = [];
  for (const field of requiredFields) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      body[field] === "" ||
      (Array.isArray(body[field]) && body[field].length === 0)
    ) {
      missing.push(field);
    }
  }
  return missing;
};

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
      images,
      difficult,
    } = req.body;

    // List of fields you expect
    const requiredFields = [
      "title",
      "subtitle",
      "description",
      "techStack",
      "features",
      "liveDemoLink",
      "images",
      "difficult",
    ];

    // Check missing fields
    const missingFields = checkMissingFields(requiredFields, req.body);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    const project = await Project.create({
      difficult,
      title,
      subtitle,
      techStack,
      description,
      liveDemoLink,
      images,
      features,
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
    const projectData = await Project.findById(_id);
    if (!projectData) {
      return res.status(400).send("Project not found");
    }

    try {
      await deleteFile(projectData.images);
    } catch (error) {
      console.error(error);
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
    const project = await Project.find();

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
      difficult,
      _id,
      title,
      subtitle,
      githubLink,
      features,
      techStack,
      liveDemoLink,
      description,
      images,
    } = req.body;

    if (!_id) {
      return res.status(400).send("_id is required");
    }

    const EditData = {};
    if (title) EditData.title = title;
    if (difficult) EditData.difficult = difficult;
    if (description) EditData.description = description;
    if (liveDemoLink) EditData.liveDemoLink = liveDemoLink;
    if (subtitle) EditData.subtitle = subtitle;
    if (techStack) EditData.techStack = techStack;
    if (features) EditData.features = features;
    if (githubLink) EditData.githubLink = githubLink;
    if (images) {
      try {
        const projectdata = await Project.findById(_id);
        await deleteFile(projectdata.images);
      } catch (error) {
        console.error(error);
      }
      EditData.images = images;
    }

    const project = await Project.findByIdAndUpdate(_id, EditData, {
      new: true,
    });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const GetProjectData=async(req,res)=>{
  try {
    const {_id}=req.params;

    if(!_id){
      return res.status(400).send("_id is required")
    }

    const projectData=await Project.findById(_id);
    if(projectData){
      return res.status(200).json({data:projectData,success:true})
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send("Some error is occured")
  }
}