const nodemailer = require("nodemailer");
const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express.Router();

app.post(
  "/",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 1 }),
    body("number").isMobilePhone(),
    body("message").isLength({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      from:req.body.email,               // User's email address
      to: "rathodpratik1928@gmail.com",    // Your email address
      subject: "Email from your portfolio",
      text: `Name: ${req.body.name}\nEmail:${req.body.email}\nPhone: ${req.body.number}\nMessage: ${req.body.message}`
    };
    console.log("Sending email from:", receiver.from);

    auth.sendMail(receiver, (error, emailResponse) => {
      if (error) {
        console.error("Failed to send email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent successfully!");
      res.status(200).json({ message: "Email sent successfully!" });
    });
  }
);

module.exports = app;
