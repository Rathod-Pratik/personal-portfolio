import { AdminModel } from "../Model/Admin.model.js";
import blogModel from "../Model/blog.model.js";
import { CodeModel } from "../Model/code.model.js";
import { NoteModel } from "../Model/note.model.js";
import { Project } from "../Model/project.model.js";

export const FetchStates = async (req, res) => {
  const admin = await AdminModel.findOne();
  const BlogLength = await blogModel.countDocuments();
  const CodeLength = await CodeModel.countDocuments();
  const ProjectLength = await Project.countDocuments();
  const NoteLength = await NoteModel.countDocuments();

  return res.status(200).json({
    BlogLength,
    CodeLength,
    ProjectLength,
    NoteLength,
    AdminView: admin.view,
    MonthlyViews: admin.monthlyViews,
  });
}