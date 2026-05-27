import type { Request, Response } from 'express';
import { BudgetModel } from './budget.model.ts';

export const GetBudgets = async (_req: Request, res: Response) => {
  try {
    const items = await BudgetModel.find({}).sort({ createdAt: 1 }).lean();
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(400).json({ success: false, data: [] });
  }
};

export const CreateBudget = async (req: Request, res: Response) => {
  try {
    const { value, isActive = true, order = 0 } = req.body;
    if (!value) return res.status(400).json({ success: false, data: [] });

    const item = await BudgetModel.create({ value: value.trim(), isActive, order });
    return res.status(200).json({ success: true, data: [item.toObject()] });
  } catch (error) {
    return res.status(400).json({ success: false, data: [] });
  }
};

export const UpdateBudget = async (req: Request<{ _id: string }>, res: Response) => {
  try {
    const { _id } = req.params;
    const { value, isActive, order } = req.body;
    if (!_id) return res.status(400).json({ success: false, data: [] });

    const updated = await BudgetModel.findByIdAndUpdate(
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

export const DeleteBudget = async (req: Request<{ _id: string }>, res: Response) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ success: false });

    const deleted = await BudgetModel.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    return res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
