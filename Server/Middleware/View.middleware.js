import { AdminModel } from "../Model/Admin.model.js";

export const updateAdminViews = async (req, res, next) => {
   try {
    const month = new Date().toLocaleString("en-US", { month: "short" }); // e.g. "Jan"

    await AdminModel.updateOne(
      {}, // since only one admin document exists
      {
        $inc: { view: 1, [`monthlyViews.${month}`]: 1 }
      },
      { upsert: true } // create document if not found
    );

    next();
  } catch (err) {
    console.error("Error updating views:", err);
    next();
  }
};
