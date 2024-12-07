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
} from "./user.controller.js";
import authCtrl from "./auth.controller.js";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.delete("/", removeAllUsers);

router.route("/profile").get(authCtrl.requireSignin, getUserProfile);

router.param("id", userByID);
router
  .route("/:id")
  .get(authCtrl.requireSignin, getUserById)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, updateUser)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, removeUser);

export default router;
