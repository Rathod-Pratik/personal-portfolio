import { contactModel } from "../Model/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).send("All fields are required");
    }

    const contact = contactModel.create({ name, email, mobile, message });

    if (contact) {
      return res.status(200).json({ success: true, data: contact });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const DeleteContact = async (req, res) => {
  try {
    const {_id } = req.body;

    if (!_id) {
      return res.status(400).send("All fields are required");
    }

    const contact = contactModel.findByIdAndDelete(_id);

    if (contact) {
      return res.status(200).json({ success: true, message:"Contact Deleted successfully" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const GetContact = async (req, res) => {
  try {
    const contact = contactModel.find();

    if (contact) {
      return res.status(200).json({ success: true, data: contact });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
