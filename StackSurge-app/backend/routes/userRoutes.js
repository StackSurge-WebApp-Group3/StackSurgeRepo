import express from "express";

import { getAllUsers, getUserById, addUser, updateUser, removeUser, removeAllUsers, userCtrl, read} from "../controllers/userController.js";
import authCtrl from "../controllers/authController.js"
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", removeUser);
router.delete("/", removeAllUsers);

router.route("/user/me")
.get(authCtrl.requireSignin,userCtrl.read)
.put(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.updateUser)
.delete(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.removeUser)
export default router;
