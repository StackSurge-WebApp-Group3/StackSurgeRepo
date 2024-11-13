import express from "express";

import { getAllUsers, getUserById, addUser, updateUser, removeUser, removeAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", removeUser);
router.delete("/", removeAllUsers);

export default router;
