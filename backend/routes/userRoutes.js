import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../modules/userSchema.js";

dotenv.config();

const UserRouter = express.Router();

// POST: Get user's name by ID
UserRouter.post("/getNameById", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ name: user.name });
  } catch (err) {
    res.status(500).json({ error: "Invalid fields" });
  }
});

// POST: Sign up
UserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "Please login now" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Invalid fields" });
  }
});

// POST: Login and return JWT
UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email not found, please signup" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Incorrect email/password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name , email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token expires in 1 day
    );

    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Invalid fields" });
  }
});

export default UserRouter;
