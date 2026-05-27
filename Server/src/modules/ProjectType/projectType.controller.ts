import type { Request, Response } from 'express';
import { ProjectTypeModel } from './projectType.model.ts';

export const GetProjectTypes = async (_req: Request, res: Response) => {
  try {
    const items = await ProjectTypeModel.find({}).sort({ order: 1, value: 1 }).lean();
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(400).json({ success: false, data: [] });
  }
};

export const CreateProjectType = async (req: Request, res: Response) => {
  try {
    const { value, isActive = true, order = 0 } = req.body;
    if (!value) return res.status(400).json({ success: false, data: [] });

    const item = await ProjectTypeModel.create({ value: value.trim(), isActive, order });
    return res.status(200).json({ success: true, data: [item.toObject()] });
  } catch (error) {
    return res.status(400).json({ success: false, data: [] });
  }
};

export const UpdateProjectType = async (req: Request<{ _id: string }>, res: Response) => {
  try {
    const { _id } = req.params;
    const { value, isActive, order } = req.body;
    if (!_id) return res.status(400).json({ success: false, data: [] });

    const updated = await ProjectTypeModel.findByIdAndUpdate(
      _id,
      {
        ...(value !== undefined ? { value: value.trim() } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
        ...(order !== undefined ? { order } : {}),
      },
      { new: true },
    );

    if (!updated) return res.status(404).json({ success: false, data: [] });
    return res.status(200).json({ success: true, data: [updated.toObject()] });
  } catch (error) {
    return res.status(400).json({ success: false, data: [] });
  }
};

export const DeleteProjectType = async (req: Request<{ _id: string }>, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ success: false });

    const deleted = await ProjectTypeModel.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
