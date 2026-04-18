import { AdminModel } from "../Model/Admin.model.js";
import blogModel from "../Model/blog.model.js";
import { NoteModel } from "../Model/note.model.js";
import { Project } from "../Model/project.model.js";

export const FetchStates = async (req, res) => {
  try {
    const admin = await AdminModel.findOne();
    const BlogLength = await blogModel.countDocuments();
    const ProjectLength = await Project.countDocuments();
    const NoteLength = await NoteModel.countDocuments();

    return res.status(200).json({
      BlogLength,
      ProjectLength,
      NoteLength,
      AdminView: admin ? admin.view : 0,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const IncrementView = async (req, res) => {
  try {
    const admin = await AdminModel.findOneAndUpdate(
      {},
      { $inc: { view: 1 } },
      { new: true, upsert: true },
    );

    return res
      .status(200)
      .json({ message: "View incremented successfully", view: admin.view });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
