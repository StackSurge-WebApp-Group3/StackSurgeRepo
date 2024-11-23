import express from "express";

import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
  removeAllUsers,
  userByID,
} from "../controllers/userController.js";
import authCtrl from "../controllers/authController.js";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.delete("/", removeAllUsers);

router.param("id", userByID);
router
  .route("/:id")
  .get(authCtrl.requireSignin, getUserById)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, updateUser)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, removeUser);

export default router;
