import { AdminModel } from "../Model/Admin.model.js";

export const updateAdminViews = async (req, res, next) => {
  try {
    await AdminModel.updateOne({}, { $inc: { view: 1 } }, { upsert: true });
    next();
  } catch (err) {
    console.error("Error updating views:", err);
    next();
  }
};
