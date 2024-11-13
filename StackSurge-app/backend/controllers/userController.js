import bcrypt from "bcrypt";

import User from "../models/user.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  try {
    const hashed_pwd = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, hashed_pwd });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.hashed_pwd = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
export const removeUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all users
export const removeAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: "All users deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
