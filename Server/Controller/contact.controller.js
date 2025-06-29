import { contactModel } from "../Model/contact.model.js";
const nodemailer = require("nodemailer");

export const createContact = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).send("All fields are required");
    }

    const auth = nodemailer.createTransport({
          service: "gmail",
          secure: true,
          port: 465,
          auth: {
            user: "rathodpratik1928@gmail.com",
            pass: "kusm lsut pxoh wpkr", 
          },
        });
        
        const receiver = {
          from:email,               // User's email address
          to: "rathodpratik1928@gmail.com",    // Your email address
          subject: "Email from your Portfolio",
          text: `Name: ${name}\nEmail:${email}\nPhone: ${mobile}\nMessage: ${message}`
        };
    
        auth.sendMail(receiver, (error, emailResponse) => {
          if (error) {
            console.error("Failed to send email:", error);
            return res.status(500).json({ message: "Error sending email" });
          }
          console.log("Email sent successfully!");
          res.status(200).json({ message: "Email sent successfully!" });
        });

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
    const {_id } = req.params;

    if (!_id) {
      return res.status(400).send("All fields are required");
    }

    const contact =await contactModel.findByIdAndDelete(_id);

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
    const contact =await contactModel.find();

    if (contact) {
      return res.status(200).json({ success: true, data: contact });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
