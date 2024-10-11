const express = require("express");
const { body, validationResult } = require("express-validator");
const form_data = require("../model/Form_Data");

const app = express.Router();

app.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("number", "Enter a valid mobile number").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await form_data.create({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        message: req.body.message,
      });

      res.send({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the data." });
    }
  }
);

module.exports = app;
