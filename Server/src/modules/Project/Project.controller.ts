import { Project } from './project.model.ts';
import { Get_Signed_Url, deleteFile, uploadFileToS3 } from '@utils';
import type { Request, Response } from 'express';
import type {
  CreateProjectRequestBody,
  EditProjectRequestBody,
  ProjectIdParams,
  UpdateProjectData,
} from '@type';

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

  return files?.file?.[0] ?? files?.image?.[0] ?? req.file ?? null;
};

const parseListField = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item)).filter(Boolean);
    }
  } catch {
    // fall through to comma-separated parsing
  }

  return value.split(',').map((item) => item.trim()).filter(Boolean);
};

const signProjectImage = async <T extends { images?: string }>(project: T) => {
  if (project.images && typeof project.images === 'string' && !project.images.startsWith('http')) {
    try {
      const signed = await Get_Signed_Url({ key: project.images });
      if (signed?.url) {
        return { ...project, images: signed.url };
      }
    } catch (error) {
      console.error('Failed to sign project image', error);
    }
  }

  return project;
};

const checkMissingFields = (
  requiredFields: readonly (keyof CreateProjectRequestBody)[],
  body: CreateProjectRequestBody,
): string[] => {
  const missing: string[] = [];
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

export const CreateProject = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      title,
      subtitle,
      description,
      techStack,
      features,
      liveDemoLink,
      difficult,
    } = req.body;
    const file = getUploadedFile(req);

      const requiredFields: readonly (keyof CreateProjectRequestBody)[] = [
      "title",
      "subtitle",
      "description",
      "techStack",
      "features",
      "liveDemoLink",
      "difficult",
    ];

    // Check missing fields
    const missingFields = checkMissingFields(requiredFields, req.body);

    if (!file) {
      missingFields.push("images");
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Project image is required",
      });
    }

    const uploadedFile = await uploadFileToS3({
      buffer: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
      folderType: 'Project',
    });

    const project = await Project.create({
      difficult,
      title,
      subtitle,
      techStack: parseListField(techStack),
      description,
      liveDemoLink,
      images: uploadedFile.key,
      features: parseListField(features),
    });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};

export const DeleteProject = async (
  req: Request<ProjectIdParams>,
  res: Response,
) => {
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
      if (projectData.images) {
        await deleteFile(projectData.images);
      }
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
      message: toErrorMessage(error),
    });
  }
};

export const GetProject = async (_req: Request, res: Response) => {
  try {
    const project = await Project.find();

    if (project) {
      const signedProjects = await Promise.all(project.map((item) => signProjectImage(item.toObject ? item.toObject() : item)));
      return res.status(200).json({ success: true, data: signedProjects });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};

export const EditProject = async (
  req: Request,
  res: Response,
) => {
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
    } = req.body;
    const file = getUploadedFile(req);

    if (!_id) {
      return res.status(400).send("_id is required");
    }

    const EditData: UpdateProjectData = {};
    if (title) EditData.title = title;
    if (difficult) EditData.difficult = difficult;
    if (description) EditData.description = description;
    if (liveDemoLink) EditData.liveDemoLink = liveDemoLink;
    if (subtitle) EditData.subtitle = subtitle;
    if (techStack) EditData.techStack = parseListField(techStack);
    if (features) EditData.features = parseListField(features);
    if (githubLink) EditData.githubLink = githubLink;

    if (file) {
      try {
        const projectdata = await Project.findById(_id);
        if (projectdata?.images) {
          await deleteFile(projectdata.images);
        }
      } catch (error) {
        console.error(error);
      }

      const uploadedFile = await uploadFileToS3({
        buffer: file.buffer,
        fileName: file.originalname,
        fileType: file.mimetype,
        folderType: 'Project',
      });

      EditData.images = uploadedFile.key;
    }

    const project = await Project.findByIdAndUpdate(_id, EditData, {
      new: true,
    });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error) || "Something went wrong",
    });
  }
};

export const GetProjectData = async (
  req: Request<ProjectIdParams>,
  res: Response,
) => {
  try {
    const {_id}=req.params;

    if(!_id){
      return res.status(400).send("_id is required")
    }

    const projectData=await Project.findById(_id);
    if(projectData){
      const signedProject = await signProjectImage(projectData.toObject ? projectData.toObject() : projectData);
      return res.status(200).json({data:signedProject,success:true})
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send("Some error is occured")
  }
}