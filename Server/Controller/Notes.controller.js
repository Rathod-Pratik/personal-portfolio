import { NoteModel } from "../Model/note.model.js";

export const CreateNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { fileUrl, fileId, imageUrl, imageId } = req.uploadedFiles;
    if (!title || !description || !note_image_url || !note_pdf_url) {
      return res.status(400).send("All the fields are required");
    }

    const note = await NoteModel.create({
      title,
      imageId,
      description,
      fileId,
      note_image_url:imageUrl,
      note_pdf_url:fileUrl,
    });

    if (note) {
      return res.status(200).json({ success: true, data: note });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const EditNote = async (req, res) => {
  try {
    const {_id, title, description } = req.body;
    const {fileUrl, fileId, imageUrl, imageId}=req.uploadedFile;
    const EditData={};
    if(title)EditData.title=title;
    if(description)EditData.description=description;
    if (fileUrl) EditData.note_pdf_url = fileUrl;
    if (fileId) EditData.fileId = fileId;
    if (imageUrl) EditData.note_image_url = imageUrl;
    if (imageId) EditData.imageId = imageId;

    const note = await NoteModel.findByIdAndUpdate(_id,EditData,{new:true});

    if (note) {
      return res.status(200).json({ success: true, data: note });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const GetNote = async (req, res) => {
  try {
    const note = await NoteModel.find();

    if (note) {
      return res.status(200).json({ success: true, data: note });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const DeleteNote = async (req, res) => {
  try {
    const {_id } = req.body;

    const note = await NoteModel.findOneAndDelete(_id);

    if (note) {
      return res.status(200).json({ success: true, data: "Notes deleted successfully" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
