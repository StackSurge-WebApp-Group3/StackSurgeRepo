import express from "express";

import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
  removeAllUsers,
  userByID,
  getUserProfile,
} from "../controllers/userController.js";
import {
  requireSignin,
  hasAuthorization,
} from "../controllers/authController.js";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.delete("/", removeAllUsers);

router.route("/profile").get(requireSignin, getUserProfile);

router.param("id", userByID);
router
  .route("/:id")
  .get(requireSignin, getUserById)
  .put(requireSignin, hasAuthorization, updateUser)
  .delete(requireSignin, hasAuthorization, removeUser);

export default router;
